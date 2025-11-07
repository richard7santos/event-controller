import React from "react";
import styled from "styled-components";
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import { styles } from "./EventItem.style";

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  margin: 0.25rem 0;
`;

const EventItem = ({ evento }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EventDetail', { evento })
    };
    const formatDate = (dateStr) => {
        if (!dateStr) return "Não informada";
        try {
            const [year, month, day] = dateStr.split("-");
            return `${day}/${month}/${year}`;
        } catch {
            return "Não informada";
        }
    };
    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Card>
                <Title>{evento.nome}</Title>
                <Info>Local: {evento.local || "Não informado"}</Info>
                <Info>Data: {formatDate(evento.data)}</Info>
                <Info>
                    Horário:{" "}
                    {evento.horaInicio && evento.horaFim
                        ? `${evento.horaInicio} às ${evento.horaFim}`
                        : "Não informado"}
                </Info>
                <Info>Vagas: {evento.lotacaoMaxima || "Não informado"}</Info>
            </Card>
        </Pressable>
    );
};

export default EventItem;
