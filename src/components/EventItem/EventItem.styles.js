import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: '#f8b4d9', // rosa claro
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#c2185b', // tom de rosa escuro para destacar
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    detail: {
        fontSize: 15,
        color: '#555',
        marginBottom: 6,
        lineHeight: 22,
    },
});
