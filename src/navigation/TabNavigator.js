import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import ParticipantesList from '../screens/ParticipantesList';
import UserProfile from '../screens/UserProfile';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Participantes"
                component={ParticipantesList}
            />
            <Tab.Screen
                name="Perfil"
                component={UserProfile}
            />

        </Tab.Navigator>
    );
};

export default TabNavigator;