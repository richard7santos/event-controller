import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert,
    Button,
    Image,
} from "react-native";
import { databases } from "../../services/appWriteConfig";
import { styles } from "./EventDetail.styles";
import { AppContext } from "../../context/AppContext";
import ModalConfirmation from "../../components/ModalConfirmation";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

const EventDetail = ({ route }) => {
    const { user } = useContext(AppContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isParticipant, setIsParticipant] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [actionType, setActionType] = useState(null);

    const eventId = route.params.evento.id;

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const response = await databases.getDocument(DATABASE_ID, EVENTOS_COLLECTION_ID, eventId);
            setEvent(response);

            const jaInscrito = response.participantes?.includes(user.$id);
            setIsParticipant(jaInscrito);
        } catch (error) {
            console.error("Erro ao buscar evento:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInscricao = async () => {
        try {
            const participantesAtualizados = [...(event.participantes || []), user.$id];

            await databases.updateDocument(DATABASE_ID, EVENTOS_COLLECTION_ID, eventId, {
                participantes: participantesAtualizados,
            });

            Alert.alert("Sucesso", "Inscrição realizada com sucesso!");
            setIsParticipant(true);
            fetchEvent();
        } catch (error) {
            console.error("Erro ao inscrever:", error.message);
            Alert.alert("Erro", "Não foi possível se inscrever.");
        }
    };

    const handleCancelarInscricao = async () => {
        try {
            const participantesAtualizados = event.participantes.filter((id) => id !== user.$id);

            await databases.updateDocument(DATABASE_ID, EVENTOS_COLLECTION_ID, eventId, {
                participantes: participantesAtualizados,
            });

            Alert.alert("Cancelado", "Inscrição cancelada.");
            setIsParticipant(false);
            fetchEvent();
        } catch (error) {
            console.error("Erro ao cancelar inscrição:", error.message);
            Alert.alert("Erro", "Não foi possível cancelar a inscrição.");
        }
    };

    const handleOpenModal = (type) => {
        setActionType(type);
        setModalVisible(true);
    };

    const handleConfirmAction = () => {
        if (actionType === "inscrever") {
            handleInscricao();
        } else if (actionType === "cancelar") {
            handleCancelarInscricao();
        }
        setModalVisible(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#003366" />
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Evento não encontrado.</Text>
            </View>
        );
    }

    const vagasDisponiveis = event.lotacaoMaxima - (event.participantes?.length || 0);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{event.nome}</Text>

            <Text style={styles.label}>Data e Horário:</Text>
            <Text style={styles.text}>{new Date(event.dataHora).toLocaleString("pt-BR")}</Text>

            <Text style={styles.label}>Local:</Text>
            <Text style={styles.text}>{event.local}</Text>

            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.text}>{event.endereco}</Text>

            <Text style={styles.label}>Lotação Máxima:</Text>
            <Text style={styles.text}>{event.lotacaoMaxima}</Text>

            <Text style={styles.label}>Vagas Disponíveis:</Text>
            <Text style={styles.text}>{vagasDisponiveis}</Text>

            <Text style={styles.label}>Informações Gerais:</Text>
            <Text style={styles.text}>{event.informacoesGerais}</Text>

            {event.imagem && (
                <Image
                    source={{ uri: event.imagem }}
                    style={{ width: "100%", height: 200, borderRadius: 8, marginTop: 16 }}
                    resizeMode="cover"
                />
            )}

            <View style={{ marginTop: 20 }}>
                {isParticipant ? (
                    <Button
                        title="Cancelar Inscrição"
                        color="#cc0000"
                        onPress={() => handleOpenModal("cancelar")}
                    />
                ) : (
                    <Button
                        title="Inscrever-se"
                        onPress={() => handleOpenModal("inscrever")}
                        disabled={vagasDisponiveis <= 0}
                    />
                )}
            </View>

            <ModalConfirmation
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirmAction}
                message={
                    actionType === "inscrever"
                        ? "Deseja confirmar sua inscrição neste evento?"
                        : "Deseja cancelar sua inscrição neste evento?"
                }
            />
        </ScrollView>
    );
};

export default EventDetail;
