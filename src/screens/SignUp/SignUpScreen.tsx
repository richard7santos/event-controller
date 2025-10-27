import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, Switch } from "react-native";
import { styles } from "./SignUp.Styles";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const SignUpScreen: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [password, setPassword] = useState("");
    const [isUnipacStudent, setIsUnipacStudent] = useState(false);
    const [registrationNumber, setRegistrationNumber] = useState("");

    const navigation = useNavigation();
    const { signUp } = useContext(AppContext);

    const handleCepChange = async (cepValue: string) => {
        setCep(cepValue);
        const numericCep = cepValue.replace(/\D/g, "");
        if (numericCep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${numericCep}/json/`);
                if (response.data && !response.data.erro) {
                    const { logradouro, bairro, localidade, uf } = response.data;
                    setAddress(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
                } else {
                    Alert.alert("Erro", "CEP inválido.");
                }
            } catch {
                Alert.alert("Erro", "Não foi possível buscar o endereço.");
            }
        }
    };

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) => password.length >= 6;

    const handleSignUp = async () => {
        if (!name || !email || !phone || !cep || !address || !number || !password) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Erro", "E-mail inválido.");
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (isUnipacStudent && !registrationNumber) {
            Alert.alert("Erro", "Informe o número de matrícula.");
            return;
        }

        await signUp({
            name,
            email,
            phone,
            cep,
            address,
            number,
            complement,
            password,
            isUnipacStudent,
            registrationNumber,
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInputMask
                type="cel-phone"
                options={{ maskType: "BRL", withDDD: true, dddMask: "(99) " }}
                style={styles.input}
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInputMask
                type="zip-code"
                style={styles.input}
                placeholder="CEP"
                value={cep}
                onChangeText={handleCepChange}
                keyboardType="numeric"
            />
            <TextInput style={styles.input} placeholder="Endereço" value={address} editable={false} />
            <TextInput style={styles.input} placeholder="Número" value={number} onChangeText={setNumber} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Complemento" value={complement} onChangeText={setComplement} />
            <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

            <View style={styles.switchContainer}>
                <Text style={{ color: "#fff" }}>É aluno Unipac?</Text>
                <Switch value={isUnipacStudent} onValueChange={setIsUnipacStudent} />
            </View>

            {isUnipacStudent && (
                <TextInput
                    style={styles.input}
                    placeholder="Número de matrícula"
                    value={registrationNumber}
                    onChangeText={setRegistrationNumber}
                    keyboardType="numeric"
                />
            )}

            <Button title="Cadastrar" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpScreen;
