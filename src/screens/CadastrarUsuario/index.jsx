import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './cadastrar.styles';
import useCadastro from '../CadastrarUsuario/useCadastro'; // Ajuste o caminho conforme necessário

const CadastrarUsuario = () => {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const fetchAddressByCep = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                Alert.alert('Erro', 'CEP inválido!');
                return;
            }
            setFormData({
                ...formData,
                endereco: data.logradouro,
                complemento: data.complemento,
                cep: data.cep,
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível buscar o endereço.');
        }
    };

    const handleCepChange = (value) => {
        handleChange('cep', value);
        if (value.length === 8) {
            fetchAddressByCep(value);
        }
    };

    const { cadastrarUsuario, loading } = useCadastro();

    const handleSubmit = async () => {
        if (formData.senha !== formData.confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }

        await cadastrarUsuario(formData);
        if (!loading) {
            navigation.navigate('Login');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastrar Usuário</Text>

            {[
                { label: 'Nome', name: 'nome' },
                { label: 'Data de Nascimento', name: 'dataNascimento' },
                { label: 'Email', name: 'email' },
                { label: 'Senha', name: 'senha', secure: true },
                { label: 'Confirmar Senha', name: 'confirmarSenha', secure: true },
                { label: 'Telefone', name: 'telefone' },
                { label: 'CEP', name: 'cep', onChange: handleCepChange },
                { label: 'Endereço', name: 'endereco' },
                { label: 'Número', name: 'numero' },
                { label: 'Complemento', name: 'complemento' },
            ].map(({ label, name, secure, onChange }) => (
                <View key={name} style={styles.inputGroup}>
                    <Text>{label}</Text>
                    <TextInput
                        secureTextEntry={secure}
                        style={styles.input}
                        value={formData[name]}
                        onChangeText={(value) => (onChange ? onChange(value) : handleChange(name, value))}
                    />
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CadastrarUsuario;
