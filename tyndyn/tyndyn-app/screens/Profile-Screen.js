import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.22:8000/api/profile')
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleButtonPress = (buttonName) => {
    console.log(buttonName + ' CLICKED');
    // Add navigation logic or other actions here
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profile ? (
          <>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.text}>{profile.id}</Text>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.text}>{profile.username}</Text>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.text}>{profile.dob}</Text>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.text}>{profile.gender}</Text>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.text}>{profile.location}</Text>
            <Text style={styles.label}>Bio:</Text>
            <Text style={styles.text}>{profile.bio}</Text>
            <Text style={styles.label}>Notifications:</Text>
            <Text style={styles.text}>{profile.notifications ? 'Enabled' : 'Disabled'}</Text>
            <Text style={styles.label}>Show Gender:</Text>
            <Text style={styles.text}>{profile.show_gender ? 'Yes' : 'No'}</Text>
            <Text style={styles.label}>Mode:</Text>
            <Text style={styles.text}>{profile.mode}</Text>
          </>
        ) : (
          <Text style={styles.noDataText}>No profile data available</Text>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleButtonPress('Profile')}>
          <Text style={styles.buttonText}>👤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleButtonPress('Swipe')}>
          <Text style={styles.buttonText}>👆</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleButtonPress('Likes')}>
          <Text style={styles.buttonText}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleButtonPress('Messages')}>
          <Text style={styles.buttonText}>💬</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingVertical: 10,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
});

export default Profile;
