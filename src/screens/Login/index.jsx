import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/CustomInput';
import { styles } from './Login.styles';
import { FullWidthButton } from '../../components/Buttons';
import Logo from '../../components/Logo';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const { login } = useContext(AppContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const handleLogin = () => {
        login({ email, password });
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.form}>
                <CustomInput
                    placeholder="Email"
                    label="Email"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />
                <CustomInput
                    placeholder="Senha"
                    label="Senha"
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry
                />
                <FullWidthButton text="Entrar" title="Entrar" onPress={handleLogin} />

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Não tem conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={[styles.registerText, styles.registerLink]}>
                            CADASTRE-SE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default Login;
