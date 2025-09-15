import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../screens/UserProfile';
import { EventList } from '../screens/EventListScreen';
import UserEventsList from '../screens/UserEventList';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Eventos">
            <Tab.Screen
                name="Eventos"
                component={EventList}
                options={{
                    headerStyle: {
                        backgroundColor: '#0F62AC',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="Meus Eventos"
                component={UserEventsList}
                options={{
                    headerStyle: {
                        backgroundColor: '#0F62AC',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={UserProfile}
                options={{
                    headerStyle: {
                        backgroundColor: '#0F62AC',
                    },
                    headerTintColor: '#fff',
                }}
            />

        </Tab.Navigator>
    );
};

export default TabNavigator;