import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';
import CreateEvent from '../screens/CreateEvent';
import DetalEvent from "../screens/DetalEvent";
import EventAdmin from '../screens/EventAdmin'; 

import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import EventDetail from '../screens/EventDetail';


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
                        <Stack.Screen name="Home" component={TabNavigator}
                            options={{
                                headerShown: false,
                            }} />
       <Stack.Screen
                 name="CriarEvento"
                   component={CreateEvent}
                        options={{
                             title: 'Novo Evento',
                                   headerStyle: {
                                      backgroundColor: '#0F62AC',
       },
                                headerTintColor: '#fff',
  }}
/>
     <Stack.Screen
               name="DetalEvent"
                     component={DetalEvent}
                           options={{ title: "Detalhes do Evento" }}
      />
      <Stack.Screen
             name="EventAdmin"
                      component={EventAdmin}
                          options={{
                              title: 'Administrar Evento',
                                  headerStyle: { backgroundColor: '#0F62AC' },
                                       headerTintColor: '#fff',
  }}
/>
                        <Stack.Screen name="EventDetail"
                            component={EventDetail}
                            options={{
                                title: 'Detalhes do Evento',
                                headerStyle: {
                                    backgroundColor: '#0F62AC',
                                },
                                headerTintColor: '#fff',
                            }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{
                            title: 'Cadastrar usuário',
                            headerStyle: {
                                backgroundColor: '#0F62AC',
                            },
                            headerTintColor: '#fff',
                        }} />
                    </>

                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
