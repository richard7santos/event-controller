import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,    
        margin: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'pink',
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
    },
});
