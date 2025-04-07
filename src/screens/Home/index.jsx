import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';
import { styles } from './Home.styles';

const Home = () => {
    const navigation = useNavigation();
    const { participantes } = useContext(AppContext);

    const goToAddParticipante = () => {
        navigation.navigate('AddParticipante');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <Text style={styles.count}>
                Participantes cadastrados: {participantes.length}
            </Text>

            <TouchableOpacity style={styles.btn} onPress={goToAddParticipante}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default Home;