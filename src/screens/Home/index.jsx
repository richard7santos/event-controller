import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';
import { styles } from './Home.styles';

const Home = () => {
    const navigation = useNavigation();
    const { participantes } = useContext(AppContext);
    const [lotacao, setLotacao] = useState(2);
    const vagas = lotacao - participantes.length;
    const isLotado = participantes.length >= lotacao;

    const goToAddParticipante = () => {
        navigation.navigate('AddParticipante');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>AI TECHNOLOGY EVENT </Text>
            
            <View style={styles.container2}>
            <Text style={styles.demais}>DATA:  <Text style={styles.respostas}>08/03/2026</Text></Text>
            <Text style={styles.demais}>LOCAL: <Text style={styles.respostas}>CASTELLI HALL</Text></Text>
            <Text style={styles.demais}>LOTAÇÃO: <Text style={styles.respostas}>{lotacao}</Text></Text>
            <Text style={styles.demais}>VAGAS: <Text style={styles.respostas}>{vagas}</Text></Text>
            <Text style={styles.demais}>PARTICIPANTES CADASTRADOS:  <Text style={styles.respostas}>{participantes.length}
            </Text></Text>
            <Text style={styles.demais}> VAGAS DISPONÍVEIS: <Text style={styles.respostas}>{vagas} 
            </Text></Text>
            
            {isLotado && (
                <Text style={styles.alert}> 🚫LIMITE DE PARTICIPANTES ATINGIDO🚫</Text>
            )}
            </View>
            <TouchableOpacity disabled={isLotado} style ={styles.btn} onPress={goToAddParticipante}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}; 

export default Home;
