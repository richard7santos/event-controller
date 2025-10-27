import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/AppContext";
import { styles } from "./UserProfile.styles";

const UserProfile = () => {
    const { user, logout, userProfile } = useContext(AppContext);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Nenhum usuário logado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil do Usuário</Text>
            <Text style={styles.label}>Nome: {user.name}</Text>
            <Text style={styles.label}>Email: {user.email}</Text>
            <Text style={styles.label}>Perfil: {userProfile.role}</Text>

            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserProfile;
