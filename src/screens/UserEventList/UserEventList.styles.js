import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    eventCard: {
        backgroundColor: '#f1f1f1',
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventInfo: {
        fontSize: 14,
        marginTop: 4,
    },
    noEventsText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginTop: 20,
    },
});