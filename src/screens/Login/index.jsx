import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import { styles } from './Login.styles';
import { FullWidthButton } from '../../components/Buttons';

const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <CustomInput placeholder="Email" label={'Email'} />
                <CustomInput placeholder="Senha" label={'Senha'} secureTextEntry />
                <FullWidthButton text="Entrar" title="Entrar" onPress={() => { console.log('Cliquei no Botão') }} />
            </View>
        </View>
    );
};

export default Login;