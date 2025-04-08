import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ParticipanteCard.styles';

const ParticipanteCard = ({ participante, onRemove }) => {
    const handleRemove = () => {
        if (
            window.confirm(
                `Você realmente deseja remover ${participante.nome} do evento?`)
            ) {
                onRemove(participante.id);
            }
        };

    return (
        <View style={styles.card}>
            <View>
            <Text style={styles.nome}>{participante.nome}</Text>
            <Text>Email: {participante.email}</Text>
            <Text>Telefone: {participante.telefone}</Text>
            <Text>Idade: {participante.idade}</Text> 

            </View>

            <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
                <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
        </View>
       
    );
};

export default ParticipanteCard;
