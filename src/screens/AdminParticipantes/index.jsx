import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { styles } from './AdminParticipantesStyle';

const AdminParticipantsScreen = ({ route }) => {
  const { eventId } = route.params; 
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchParticipants = async () => {
    try {
      const docRef = doc(db, 'eventos', eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const eventData = docSnap.data();
        setParticipants(eventData.participantes || []);
      } else {
        Alert.alert('Erro', 'Evento não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar participantes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os participantes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  
  const handleAddParticipant = async (participant) => {
    try {
      const docRef = doc(db, 'eventos', eventId);
      const novoParticipante = { ...participant, presente: true };

      await updateDoc(docRef, {
        participantes: arrayUnion(novoParticipante),
      });

      Alert.alert('Sucesso', `${participant.name} foi marcado como presente!`);
      fetchParticipants();
    } catch (error) {
      console.error('Erro ao adicionar participante:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o participante.');
    }
  };

 
  const handleRemoveParticipant = async (participant) => {
    try {
      const docRef = doc(db, 'eventos', eventId);
      await updateDoc(docRef, {
        participantes: arrayRemove(participant),
      });

      Alert.alert('Removido', `${participant.name} foi removido.`);
      fetchParticipants();
    } catch (error) {
      console.error('Erro ao remover participante:', error);
      Alert.alert('Erro', 'Não foi possível remover o participante.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0F62AC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {participants.length === 0 ? (
        <Text style={styles.empty}>Nenhum participante cadastrado.</Text>
      ) : (
        <FlatList
          data={participants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.participantBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>
                  {item.presente ? 'Presente' : 'Ausente'}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                  onPress={() => handleAddParticipant(item)}
                >
                  <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#D32F2F' }]}
                  onPress={() => handleRemoveParticipant(item)}
                >
                  <Text style={styles.actionText}>−</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => Alert.alert('Administração', 'Aqui você pode gerenciar as presenças.')}
      >
        <Text style={styles.adminText}>Administrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminParticipantsScreen;
