import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

    const handleRegister = () => {
        navigation.navigate('CadastrarUsuario');
    };

    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.form}>
                <CustomInput placeholder="Email" label={'Email'} value={email} onChangeText={(e) => setEmail(e)} />
                <CustomInput placeholder="Senha" label={'Senha'} value={password} onChangeText={(e) => setPassword(e)} secureTextEntry />
                <FullWidthButton text="Entrar" title="Entrar" onPress={handleLogin} />

                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
