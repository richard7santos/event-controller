import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { styles } from './ParticipanteForm.styles';
import CustomInput from '../../components/CustomInput';
import { FullWidthButton } from '../../components/Buttons';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const ParticipanteForm = () => {
    const { addParticipante } = useContext(AppContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idade, setIdade] = useState('');

    const navigation = useNavigation();

    const handleSubmit = () => {
        if (!nome || !email || !telefone || !idade) {
            alert("Preencha todos os campos.");
            return;
        }

        addParticipante({ nome, email, telefone, idade });
        alert("Participante adicionado!");
        setNome('');
        setEmail('');
        setTelefone('');
        setIdade('');
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <CustomInput label="Nome" placeholder="Digite seu nome" value={nome} onChangeText={setNome} />
                <CustomInput label="Email" placeholder="Digite seu email" value={email} onChangeText={setEmail} />
                <CustomInput label="Telefone" placeholder="Digite seu telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
                <CustomInput label="Idade" placeholder="Digite sua idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
                <FullWidthButton title="Salvar" text="Salvar" onPress={handleSubmit} />
            </View>
        </View>
    );
};

export default ParticipanteForm;
