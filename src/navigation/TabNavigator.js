import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UserProfile from '../screens/UserProfile';
import { EventList } from '../screens/EventListScreen';
import UserEventsList from '../screens/UserEventList';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Eventos"
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#0F62AC',
                },
                headerTintColor: '#fff',
                tabBarActiveTintColor: '#0F62AC',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#fff',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Eventos') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Meus Eventos') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Eventos" component={EventList} />
            <Tab.Screen name="Meus Eventos" component={UserEventsList} />
            <Tab.Screen name="Perfil" component={UserProfile} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
