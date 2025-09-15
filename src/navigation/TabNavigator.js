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
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Meus Eventos"
                component={UserEventsList}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Perfil"
                component={UserProfile}
            />

        </Tab.Navigator>
    );
};

export default TabNavigator;