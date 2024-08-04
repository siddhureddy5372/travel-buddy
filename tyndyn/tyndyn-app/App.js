import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import index from './screens/index';
import AppleLoginScreen from './screens/Apple-Login-Screen'
import FacebookLoginScreen from './screens/FaceBook-Login-Screen';
import PhoneLogginScreen from './screens/Phone-Login-Screen';
import NameSubmit from './screens/NameSubmit';
import Hobbies from './screens/Hobbies-Screen';
import Country from './screens/Country-Screen-Visited';
import Profile from './screens/Profile-Screen';
import WishToVisitScreen from './screens/Country-Screen-noVisited';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: '#809BBF', // cor de fundo
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={index}
          options={{ headerShown: false }} // Oculta o cabeçalho para a tela de login
        />

        {/* APPLE LOGIN NAVIGATION SYNTAX */}
        <Stack.Screen
          name="AppleLogin"
          component={AppleLoginScreen}
          options={{
            title: 'Login com Apple',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />

          {/* FACEBOOK LOGIN NAVIGATION SYNTAX */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />


        {/* FACEBOOK LOGIN NAVIGATION SYNTAX */}
        <Stack.Screen
          name="FaceBookLogin"
          component={FacebookLoginScreen}
          options={{
            title: 'Login com Facebook',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />

        {/* PHONE LOGIN NAVIGATION SYNTAX */}
        <Stack.Screen
          name="PhoneLogin"
          component={PhoneLogginScreen}
          options={{
            title: 'Login com Telefone',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />

        {/* NAME SUBMITION NAVIGATION SYNTAX */}
        <Stack.Screen
          name="NameSubmit"
          component={NameSubmit}
          options={{
            title: 'Name',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />
        <Stack.Screen
          name="HobbieScreen"
          component={Hobbies}
          options={{
            title: 'Hobbies',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />
        <Stack.Screen
          name="CountryScreen"
          component={Country}
          options={{
            title: 'Country',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />
        <Stack.Screen
          name="WishToVisitScreen"
          component={WishToVisitScreen}
          options={{
            title: 'Country',
            headerStyle: { backgroundColor: '#809BBF' }, // cor da barra de navegação
            headerTintColor: 'white', // cor do texto na barra de navegação
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default App;