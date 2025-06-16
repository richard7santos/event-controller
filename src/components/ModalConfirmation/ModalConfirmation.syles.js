import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cancelButton: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 8,
    },
    cancelText: {
        color: '#333',
    },
    confirmButton: {
        padding: 10,
        backgroundColor: '#003366',
        borderRadius: 8,
    },
    confirmText: {
        color: '#fff',
    },
});
