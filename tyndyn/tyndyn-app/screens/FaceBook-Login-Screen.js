// Profile.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Profile = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.22:8000/api/logout/');
      // Handle any additional logout logic (clearing local storage, navigating to login screen, etc.)
      console.log('Logout successful');
      // Navigate back to Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error scenarios (display message, retry logout, etc.)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to your Profile!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
