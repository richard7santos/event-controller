import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert,
    Button,
} from 'react-native';
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { styles } from './EventDetail.styles';
import { AppContext } from '../../context/AppContext';
import ModalConfirmation from '../../components/ModalConfirmation';

const EventDetail = ({ route }) => {
    const { user } = useContext(AppContext);
    const [event, setEvent] = useState(null);
    const [eventId, setEventId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isParticipant, setIsParticipant] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [actionType, setActionType] = useState(null);

    useEffect(() => {
        setEventId(route.params.evento.id);
    }, []);

    useEffect(() => {
        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            const docRef = doc(db, 'eventos', eventId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const eventoData = docSnap.data();
                setEvent(eventoData);

                const jaInscrito = eventoData.participantes?.some((p) => p.email === user.email);
                setIsParticipant(jaInscrito);
            } else {
                console.log('Evento não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar evento:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInscricao = async () => {
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                Alert.alert('Erro', 'Dados do usuário não encontrados.');
                return;
            }

            const userData = userSnap.data();

            const participante = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                number: userData.number,
                cep: userData.cep,
                complement: userData.complement,
                isUnipacStudent: userData.isUnipacStudent,
                registrationNumber: userData.registrationNumber || null,
                uid: user.uid,
            };

            const eventoRef = doc(db, 'eventos', eventId);
            await updateDoc(eventoRef, {
                participantes: arrayUnion(participante),
            });

            Alert.alert('Sucesso', 'Inscrição realizada com sucesso!');
            setIsParticipant(true);
            fetchEvent();
        } catch (error) {
            console.error('Erro ao inscrever:', error);
            Alert.alert('Erro', 'Não foi possível se inscrever.');
        }
    };

    const handleCancelarInscricao = async () => {
        try {
            const eventoRef = doc(db, 'eventos', eventId);

            const participanteExistente = event.participantes.find(p => p.email === user.email);

            if (!participanteExistente) {
                Alert.alert('Erro', 'Participante não encontrado.');
                return;
            }

            await updateDoc(eventoRef, {
                participantes: arrayRemove(participanteExistente),
            });

            Alert.alert('Cancelado', 'Inscrição cancelada.');
            setIsParticipant(false);
            fetchEvent();
        } catch (error) {
            console.error('Erro ao cancelar inscrição:', error);
            Alert.alert('Erro', 'Não foi possível cancelar a inscrição.');
        }
    };

    const handleOpenModal = (type) => {
        setActionType(type);
        setModalVisible(true);
    };

    const handleConfirmAction = () => {
        if (actionType === 'inscrever') {
            handleInscricao();
        } else if (actionType === 'cancelar') {
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
            <Text style={styles.text}>{event.dataHora}</Text>

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

            <View style={{ marginTop: 20 }}>
                {isParticipant ? (
                    <Button
                        title="Cancelar Inscrição"
                        color="#cc0000"
                        onPress={() => handleOpenModal('cancelar')}
                    />
                ) : (
                    <Button
                        title="Inscrever-se"
                        onPress={() => handleOpenModal('inscrever')}
                        disabled={vagasDisponiveis <= 0}
                    />
                )}
            </View>

            <ModalConfirmation
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleConfirmAction}
                message={
                    actionType === 'inscrever'
                        ? 'Deseja confirmar sua inscrição neste evento?'
                        : 'Deseja cancelar sua inscrição neste evento?'
                }
            />
        </ScrollView>
    );
};

export default EventDetail;
