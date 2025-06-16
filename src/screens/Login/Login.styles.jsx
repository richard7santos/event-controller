import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#pink',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '80%',
    },

    registerContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: '#pink',
        fontSize: 14,
    },
    registerLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});