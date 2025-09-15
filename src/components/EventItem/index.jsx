import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './EventItem.style';

const EventItem = ({ evento }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EventDetail', { evento })
    };

    const formatDate = (dataStr) => {
        const date = new Date(dataStr);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Text style={styles.title}>{evento.nome}</Text>
            <Text style={styles.detail}>Local: {evento.local}</Text>
            <Text style={styles.detail}>Data: {formatDate(evento.dataHora)}</Text>
            <Text style={styles.detail}>Vagas: {evento.lotacaoMaxima}</Text>
        </Pressable>
    );
};

export default EventItem;
