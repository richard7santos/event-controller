import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0077BD',
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
        color: '#fff',
        fontSize: 14,
    },
    registerLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});