import React, { useEffect, useState } from 'react';
import { FlatList, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { styles } from './EventList.styles';
import EventItem from '../../components/EventItem';
import useSeedEvents from '../../services/useSeedsEvent';

export const EventList = () => {
    useSeedEvents();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventosCol = collection(db, 'eventos');
                const snapshot = await getDocs(eventosCol);
                const eventosData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(eventosData);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" />;
    }

    if (events.length === 0) {
        return <Text style={styles.empty}>Nenhum evento encontrado.</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <EventItem evento={item} />
                )}
            />
        </View >
    );
};
