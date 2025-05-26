import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../services/firebaseConfig";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participantes, setParticipantes] = useState([]);

    const login = async ({ email, password }) => {
        try {
            setLoading(true);
            const user = await signInWithEmailAndPassword(auth,email, password);
            const loggedUser = {
                id: user.uid,
                name: user.displayName || "Usuário",
                email: user.email,
            };
            setUser(loggedUser);
            await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
            alert("Logado");
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    }

    const addParticipante = async ({ nome, email, telefone, idade }) => {
        const newParticipante = {
            id: Date.now(),
            nome,
            email,
            telefone,
            idade
        };
        setParticipantes((prev) => [...prev, newParticipante]);
    };

    const removeParticipante = async (id) => {
        setParticipantes((prev) => prev.filter((p) => p.id !== id));
    }

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            const storagedParticipantes = await AsyncStorage.getItem("participantes");
            if (storagedParticipantes) {
                setParticipantes(JSON.parse(storagedParticipantes));
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    useEffect(() => {
        const storeParticipantes = async () => {
            await AsyncStorage.setItem("participantes", JSON.stringify(participantes));
        };
        storeParticipantes();
    }, [participantes]);

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


}