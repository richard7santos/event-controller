import React, { useState, useEffect, createContext, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ID, Permission, Query, Role } from "appwrite";
import { account, databases } from "../services/appWriteConfig";

export const AppContext = createContext();

const DATABASE_ID = "68fe300d00286f2ad20a";
const USERS_COLLECTION_ID = "68fe41620009211f1022";

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);



    const login = async ({ email, password }) => {
        try {
            setLoading(true);
            await account.createEmailSession(email, password);
            const userData = await account.get();
            setUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            await fetchUserProfile(userData.$id);
            alert("Logado com sucesso");
        } catch (error) {
            alert("Erro ao fazer login: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession("current");
        } catch (_) { }
        setUser(null);
        setUserProfile(null);
        await AsyncStorage.removeItem("user");
    };

    const signUp = async ({
        name,
        email,
        phone,
        cep,
        address,
        number,
        complement,
        password,
        isUnipacStudent,
        registrationNumber,
    }) => {
        try {
            setLoading(true);

            // Cria conta no Appwrite
            const newUser = await account.create(ID.unique(), email, password, name);

            // Cria sessão para autenticar o novo usuário
            await account.createEmailSession(email, password);

            // Cria documento de perfil com permissões privadas
            const doc = await databases.createDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                ID.unique(),
                {
                    name,
                    email,
                    phone,
                    address,
                    number,
                    complement,
                    cep,
                    isUnipacStudent,
                    registrationNumber: isUnipacStudent ? registrationNumber : null,
                    userId: newUser.$id,
                    role: "default",
                },
                [
                    Permission.read(Role.user(newUser.$id)),
                    Permission.update(Role.user(newUser.$id)),
                    Permission.delete(Role.user(newUser.$id)),
                ]
            );


            setUser(newUser);
            setUserProfile(doc);
            await AsyncStorage.setItem("user", JSON.stringify(newUser));

            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.log("Erro ao cadastrar:", error);
            const msg =
                error?.message?.includes("already exists")
                    ? "Este e-mail já está em uso."
                    : error?.message?.includes("password")
                        ? "Senha fraca. Use ao menos 6 caracteres."
                        : "Erro ao cadastrar. Tente novamente.";
            alert("Erro: " + msg);
        } finally {
            setLoading(false);
        }
    };

    useMemo(() => {
        if (userProfile?.role === "admin") setIsAdmin(true);
    }, [userProfile]);

    const fetchUserProfile = async (userId) => {
        try {
            const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
                Query.equal("userId", userId),
            ]);
            if (response.documents.length > 0) {
                setUserProfile(response.documents[0]);
            }
        } catch (error) {
            console.log("Erro ao buscar perfil do usuário:", error.message);
        }
    };

    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                await fetchUserProfile(parsedUser.$id);
            }
        } catch (error) {
            console.log("Erro ao carregar usuário:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                userProfile,
                loading,
                login,
                logout,
                signUp,
                isAdmin
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
