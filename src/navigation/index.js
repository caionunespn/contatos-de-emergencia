import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {useAuth} from '../contexts/auth';
import { useTheme } from '../contexts/theme';

import GradientHeader from '../components/GradientHeader';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Contacts from '../screens/Contacts';
import UpdateContacts from '../screens/UpdateContacts';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthTabs = () => {

    const {theme} = useTheme();

    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: () => {
                let routeName;
  
                if (route.name === 'Contacts') {
                    routeName = 'Ligar';
                } else if (route.name === 'UpdateContacts') {
                    routeName = 'Adicionar Contatos';
                } else if (route.name === 'Profile') {
                    routeName = 'Perfil';
                }

                return <GradientHeader title={routeName} noBack />
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Contacts') {
                iconName = focused
                  ? 'call'
                  : 'call-outline';
              } else if (route.name === 'UpdateContacts') {
                iconName = focused ? 'person-add' : 'person-add-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.gradientSecondColor,
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Screen name="Contacts" component={Contacts} options={{
                title: 'Ligar'
            }} />
            <Tab.Screen name="UpdateContacts" component={UpdateContacts} options={{
                title: 'Adicionar Contatos'
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                title: 'Perfil'
            }} />
        </Tab.Navigator>
    );
}

const Routes = () => {
    const {signed} = useAuth();
    const {theme} = useTheme();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!signed ? (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{
                            headerShown: false,
                        }} />
                        <Stack.Screen name="Register" component={Register} options={{
                            header: props => <GradientHeader {...props} title="Cadastro" />,
                        }} />
                    </>
                ) : (
                    <Stack.Screen name="Auth" component={AuthTabs} options={{
                        headerShown: false,
                    }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;