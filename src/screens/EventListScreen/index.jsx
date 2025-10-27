import React, { useEffect, useState } from "react";
import { FlatList, Text, ActivityIndicator, View } from "react-native";
import { databases } from "../../services/appWriteConfig";
import { styles } from "./Eventilist.style";
import EventItem from "../../components/EventItem";
import useSeedEvents from "../../services/useSeedsEvent";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

export const EventList = () => {
    useSeedEvents();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { documents } = await databases.listDocuments(DATABASE_ID, EVENTOS_COLLECTION_ID);

                const eventosFormatados = documents.map((doc) => ({
                    id: doc.$id,
                    nome: doc.nome,
                    dataHora: doc.dataHora,
                    local: doc.local,
                    endereco: doc.endereco,
                    lotacaoMaxima: doc.lotacaoMaxima,
                    informacoesGerais: doc.informacoesGerais,
                    imagem: doc.imagem,
                    participantes: doc.participantes || [],
                }));

                setEvents(eventosFormatados);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error.message);
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
                renderItem={({ item }) => <EventItem evento={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};
