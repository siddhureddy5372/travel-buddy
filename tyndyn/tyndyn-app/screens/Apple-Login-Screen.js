import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';

const FacebookLoginScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://192.168.1.22:8000/api/upload/image/');
        
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Images</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map(image => (
          <View key={image.id} style={styles.imageWrapper}>
            <Image source={{ uri: image.image_url }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default FacebookLoginScreen;
