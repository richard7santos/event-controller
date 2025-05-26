import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db, createUserWithEmailAndPassword } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { styles } from './SignUp.Styles';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleCepChange = async (cepValue: string) => {
        setCep(cepValue);
        if (cepValue.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
                if (response.data && !response.data.erro) {
                    const { logradouro, bairro, localidade, uf } = response.data;
                    setAddress(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
                } else {
                    Alert.alert('Erro', 'CEP inválido.');
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível buscar o endereço.');
            }
        }
    };

    const handleSignUp = async () => {
        if (!name || !email || !phone || !cep || !address || !number || !password) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Gravou auth')

            await setDoc(doc(db, 'users', user.uid), {
                name,
                email,
                phone,
                address,
                number,
                complement,
                cep,
            });
            
            alert('Sucesso Usuário cadastrado com sucesso!');
        } catch (error: any) {
            console.log('Deu erro')
            alert('Erro: Não foi possível cadastrar o usuário.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário</Text>
            <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            />
            <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            />
            <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            />
            <TextInput
            style={styles.input}
            placeholder="CEP"
            value={cep}
            onChangeText={handleCepChange}
            keyboardType="numeric"
            />
            <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={address}
            onChangeText={setAddress}
            editable={false}
            />
            <TextInput
            style={styles.input}
            placeholder="Número"
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
            />
            <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={complement}
            onChangeText={setComplement}
            />
            <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <View style={{ marginTop: 16 }}>
            <Button
                title="Cadastrar"
                onPress={handleSignUp}
                color='pink' // Pink
            />
            </View>
        </View>
    );
};

export default SignUpScreen;
