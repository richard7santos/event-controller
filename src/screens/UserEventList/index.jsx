import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { AppContext } from '../../context/AppContext';
import { styles } from './UserEventList.styles';
import EventItem from '../../components/EventItem';

const UserEventsList = () => {
    const { user } = useContext(AppContext);
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserEvents();
    }, []);

    const fetchUserEvents = async () => {
        try {
            const eventosRef = collection(db, 'eventos');
            const snapshot = await getDocs(eventosRef);

            const eventosInscrito = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(evento =>
                    evento.participantes?.some(part => part.email === user.email)
                );

            setUserEvents(eventosInscrito);
        } catch (error) {
            console.error('Erro ao buscar eventos do usuário:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#003366" />
            </View>
        );
    }

    if (userEvents.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noEventsText}>Você não está inscrito em nenhum evento.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={userEvents}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <EventItem evento={item} />
            )}
            contentContainerStyle={styles.container}
        />
    );
};

export default UserEventsList;
