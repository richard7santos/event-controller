import React, { useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, Button } from "react-native";
import { databases } from "../../services/appWriteConfig";
import { AppContext } from "../../context/AppContext";
import { styles } from "./UserEventList.styles";
import EventItem from "../../components/EventItem";
import { useFocusEffect } from "@react-navigation/native";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

const UserEventsList = () => {
    const { user } = useContext(AppContext);
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserEvents = async () => {
        try {
            const { documents } = await databases.listDocuments(DATABASE_ID, EVENTOS_COLLECTION_ID);

            const eventosInscrito = documents
                .filter((evento) => evento.participantes?.includes(user.$id))
                .map((evento) => ({
                    id: evento.$id,
                    ...evento,
                }));

            setUserEvents(eventosInscrito);
        } catch (error) {
            console.error("Erro ao buscar eventos do usuário:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchUserEvents();
        }, [])
    );

    const handleCancelarInscricao = async (eventoId) => {
        try {
            const evento = userEvents.find((e) => e.id === eventoId);
            const participantesAtualizados = evento.participantes.filter((id) => id !== user.$id);

            await databases.updateDocument(DATABASE_ID, EVENTOS_COLLECTION_ID, eventoId, {
                participantes: participantesAtualizados,
            });

            Alert.alert("Cancelado", "Inscrição cancelada.");
            fetchUserEvents();
        } catch (error) {
            console.error("Erro ao cancelar inscrição:", error.message);
            Alert.alert("Erro", "Não foi possível cancelar a inscrição.");
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 20 }}>
                    <EventItem evento={item} />
                    <Button
                        title="Cancelar Inscrição"
                        color="#cc0000"
                        onPress={() => handleCancelarInscricao(item.id)}
                    />
                </View>
            )}
            contentContainerStyle={styles.container}
        />
    );
};

export default UserEventsList;
