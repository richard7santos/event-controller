import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participantes, setParticipantes] = useState([]);

    const login = async ({ email, password }) => {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedUser = userCredential.user;
            setUser(loggedUser);
            await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
            alert("Logado com sucesso");
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    const addParticipante = async ({ nome, email, telefone, idade }) => {
        try {
            setLoading(true);

            // Adiciona no Firestore
            await addDoc(collection(db, "participantes"), {
                nome,
                email,
                telefone,
                idade
            });

            // Busca todos os participantes
            const querySnapshot = await getDocs(collection(db, "participantes"));
            const participantesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Atualiza estado e armazenamento local
            setParticipantes(participantesList);
            await AsyncStorage.setItem("participantes", JSON.stringify(participantesList));
        } catch (error) {
            alert("Erro ao adicionar participante: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeParticipante = async (id) => {
        // Aqui você pode implementar a exclusão do Firestore também com deleteDoc
        setParticipantes((prev) => prev.filter((p) => p.id !== id));
    };

    const loadUserAndParticipantes = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            const querySnapshot = await getDocs(collection(db, "participantes"));
            const participantesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setParticipantes(participantesList);
            await AsyncStorage.setItem("participantes", JSON.stringify(participantesList));
        } catch (error) {
            console.log("Erro ao carregar dados:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserAndParticipantes();
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                loading,
                participantes,
                login,
                logout,
                addParticipante,
                removeParticipante,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
