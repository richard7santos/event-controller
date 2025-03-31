import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participantes, setParticipantes] = useState([]);

    const defaultUser = {
        id: 1,
        name: "Ricardo",
        email: 'richard7santos@hotmail.com',
        password: '123456'
    }

    const login = async ({ email, password }) => {
        if (email === 'richard7santos@hotmail.com' && password === '123456') {
            setUser(defaultUser);
            alert("Logado")
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }
        else {
            alert('Email ou senha inválidos!')
        }
    }

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    }

    const addParticipante = async (nome, email,) => {
        const newParticipante = { id: Date.now(), nome, email };
        setParticipantes((prev) => [...prev, newParticipante]);
    }

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
