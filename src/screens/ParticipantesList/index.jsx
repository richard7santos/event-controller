import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';
import ParticipanteCard from '../../components/ParticipanteCard';
import { styles } from './ParticipantesList.styles';

const ParticipantesList = () => {
    const { participantes, removeParticipante } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Participantes</Text>

            {participantes.length === 0 ? (
                <Text style={styles.empty}>Nenhum participante cadastrado.</Text>
            ) : (
                <FlatList
                    data={participantes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ParticipanteCard
                            participante={item}
                            onRemove={removeParticipante}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            )}
        </View>
    );
};



export default ParticipantesList;
