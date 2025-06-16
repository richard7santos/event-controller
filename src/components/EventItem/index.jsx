import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './EventItem.styles';
import { Timestamp } from 'firebase/firestore';

const EventItem = ({ evento }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EventDetail', { evento });
    };

    const formatDate = (dataHora) => {
        let dateObj;

        if (dataHora instanceof Timestamp) {
            dateObj = dataHora.toDate();
        } else if (dataHora instanceof Date) {
            dateObj = dataHora;
        } else if (typeof dataHora === 'string') {
            dateObj = new Date(dataHora);
        } else {
            return 'Data inválida';
        }

        return dateObj.toLocaleString('pt-BR', {
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
            <Text style={styles.detail}>📍 Local: {evento.local}</Text>
            <Text style={styles.detail}>⏰ Data: {formatDate(evento.dataHora)}</Text>
            <Text style={styles.detail}>👥 Vagas disponíveis: {evento.lotacaoMaxima - (evento.participantes?.length || 0)}</Text>
        </Pressable>
    );
};

export default EventItem;