import React, { useEffect, useState } from 'react';
import { FlatList, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { styles } from './Eventilist.style';
import EventItem from '../../components/EventItem';
import useSeedEvents from '../../services/useSeedsEvent';

export const EventList = ({ navigation }) => {
  useSeedEvents();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true; 

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
    return (
      <ActivityIndicator
        style={{ marginTop: 20, flex: 1 }}
        size="large"
        color="#000"
      />
    );
  }

  if (events.length === 0) {
    return <Text style={styles.empty}>Nenhum evento encontrado.</Text>;
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventItem evento={item} />}
        contentContainerStyle={{ paddingBottom: isAdmin ? 100 : 20 }} 
      />

     {isAdmin && (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      backgroundColor: '#1E90FF',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 25,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
    }}
    onPress={() => navigation.navigate('CriarEvento')}
  >
    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
      Novo Evento
    </Text>
  </TouchableOpacity>
)}

    </View>
  );
};
