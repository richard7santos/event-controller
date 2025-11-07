import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { databases } from "../../services/appWriteConfig";
import { styles } from "./EventAdminStyle";
import Ionicons from "react-native-vector-icons/Ionicons";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

const EventAdmin = ({ route }) => {
  const { evento } = route.params; 
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        EVENTOS_COLLECTION_ID,
        evento.$id 
      );

      
      const participantesFormatados = (response.participantes || []).map((p) => ({
        id: p,
        status: "ausente",
      }));

      setParticipants(participantesFormatados);
    } catch (error) {
      console.error("Erro ao buscar participantes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = (participantId) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId
          ? { ...p, status: p.status === "presente" ? "ausente" : "presente" }
          : p
      )
    );
  };

  const removeParticipant = (participantId) => {
    Alert.alert(
      "Remover participante",
      "Deseja realmente remover este participante?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () =>
            setParticipants((prev) => prev.filter((p) => p.id !== participantId)),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0F62AC" />
      </View>
    );
  }

  if (participants.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Nenhum participante inscrito.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.participantCard}>
      <Text style={styles.participantName}>{item.id}</Text>
      <Text style={styles.participantStatus}>Status: {item.status}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleStatus(item.id)} style={styles.actionButton}>
          <Ionicons
            name={item.status === "presente" ? "checkmark-circle" : "close-circle"}
            size={28}
            color={item.status === "presente" ? "green" : "red"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeParticipant(item.id)} style={styles.actionButton}>
          <Ionicons name="trash" size={28} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default EventAdmin;
