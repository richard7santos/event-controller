import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { databases } from "../../services/appWriteConfig";
import { styles } from "./Eventilist.style";
import EventItem from "../../components/EventItem";
import useSeedEvents from "../../services/useSeedsEvent";
import { AppContext } from "../../context/AppContext";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

export const EventList = () => {
  // useSeedEvents();
  const navigation = useNavigation();
  const { isAdmin } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { documents } = await databases.listDocuments(
          DATABASE_ID,
          EVENTOS_COLLECTION_ID
        );

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
       
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {isAdmin && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#0F62AC",
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 60,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }}
            onPress={() => navigation.navigate("CriarEvento")}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Novo Evento
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
