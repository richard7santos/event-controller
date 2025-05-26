import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';

import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import ParticipanteForm from '../screens/ParticipanteForm';
import CadastrarUsuario from '../screens/CadastrarUsuario';
import SignUpScreen from '../screens/SignUp/SignUpScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { user, loading } = useContext(AppContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={TabNavigator} />
                        <Stack.Screen name="AddParticipante" component={ParticipanteForm} />
                        
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="CadastrarUsuario" component={SignUpScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
