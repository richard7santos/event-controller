import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 85,
    },
    container2:{
        flex: 1,
        alignItems: 'start',
        backgroundColor: '#fff',
        paddingTop: 70,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#f75ed8',
        marginBottom: 12,
    },
    demais:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    respostas:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#f75ed8',
    },
    count: {
        fontSize: 18,
        color: '#f75ed8',
    },
    btn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    alert: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10,
    },
});