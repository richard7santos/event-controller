import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ParticipanteCard.styles';

const ParticipanteCard = ({ participante, onRemove }) => {

    return (
        <View style={styles.card}>
            <Text style={styles.nome}>{participante.nome}</Text>
            <Text>Email: {participante.email}</Text>
            <Text>Telefone: {participante.telefone}</Text>
            <Text>Idade: {participante.idade}</Text>
            <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(participante.id)}>
                <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ParticipanteCard;
