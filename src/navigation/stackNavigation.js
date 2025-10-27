import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';

// Telas
import Login from '../screens/Login';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import TabNavigator from './TabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import EventDetail from '../screens/EventDetail';
import AdminParticipantsScreen from '../screens/AdminParticipantes';

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
      <Stack.Navigator>
        {user ? (
          <>
            {/* Home */}
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />

            {/* Detalhe do Evento */}
            <Stack.Screen
              name="EventDetail"
              component={EventDetail}
              options={{
                title: 'Detalhes do Evento',
                headerStyle: { backgroundColor: '#0F62AC' },
                headerTintColor: '#fff',
              }}
            />

            {/* Criar Evento */}
            <Stack.Screen
              name="CriarEvento"
              component={CreateEventScreen}
              options={{
                title: 'Criar Novo Evento',
                headerStyle: { backgroundColor: '#0F62AC' },
                headerTintColor: '#fff',
              }}
            />

            {/* Administração de Participantes */}
            <Stack.Screen
              name="AdminParticipants"
              component={AdminParticipantsScreen}
              options={{
                title: 'Participantes do Evento',
                headerStyle: { backgroundColor: '#0F62AC' },
                headerTintColor: '#fff',
              }}
            />
          </>
        ) : (
          <>
            {/* Login / Cadastro */}
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: 'Cadastrar usuário',
                headerStyle: { backgroundColor: '#0F62AC' },
                headerTintColor: '#fff',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
