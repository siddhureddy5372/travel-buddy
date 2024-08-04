import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { countries, countriesWithEmojis } from './countrys'; // Importando os dados de países e emojis
import styles from './screenStyles/Country-Screen-Style'; // Estilos personalizados

const CountryScreen = () => {
  const [continent, setContinent] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [selectedCountriesVisited, setSelectedCountriesVisited] = useState([]);

  useEffect(() => {
    const getContinent = async () => {
      try {
        const storedContinent = await AsyncStorage.getItem('continent');
        console.log('Stored Continent:', storedContinent);
        if (storedContinent && countries[storedContinent]) {
          setContinent(storedContinent);
          setCountryList(countries[storedContinent]);
        } else {
          console.error('Continent not found in countries object:', storedContinent);
        }
      } catch (error) {
        console.error('Erro ao recuperar o continente:', error);
      }
    };

    const getSelectedCountriesVisited = async () => {
      try {
        const selectedCountriesJSON = await AsyncStorage.getItem('selectedCountriesVisited');
        if (selectedCountriesJSON) {
          setSelectedCountriesVisited(JSON.parse(selectedCountriesJSON));
        }
      } catch (error) {
        console.error('Erro ao recuperar países visitados:', error);
      }
    };

    getContinent();
    getSelectedCountriesVisited();
  }, []);

  const toggleCountrySelectionVisited = async (countryName) => {
    setSelectedCountriesVisited((prevSelected) => {
      if (prevSelected.includes(countryName)) {
        const updatedSelected = prevSelected.filter((name) => name !== countryName);
        saveSelectedCountriesVisited(updatedSelected);
        console.log('Países visitados selecionados:', updatedSelected); // Console log dos países visitados selecionados
        return updatedSelected;
      } else {
        const updatedSelected = [...prevSelected, countryName];
        saveSelectedCountriesVisited(updatedSelected);
        console.log('Países visitados selecionados:', updatedSelected); // Console log dos países visitados selecionados
        return updatedSelected;
      }
    });
  };

  const saveSelectedCountriesVisited = async (selected) => {
    try {
      await AsyncStorage.setItem('selectedCountriesVisited', JSON.stringify(selected));
    } catch (error) {
      console.error('Erro ao salvar países visitados:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <ScrollView>
            <View style={styles.row_title}>
              <View style={styles.titulo}>
                <Text style={styles.title}>{continent}</Text>
              </View>
            </View>
            <View style={styles.row}>
              {countryList.map((country, index) => (
                <TouchableOpacity key={index} onPress={() => toggleCountrySelectionVisited(country)}>
                  <View style={[
                    styles.HobbieSelect,
                    selectedCountriesVisited.includes(country) && styles.selectedHobbie,
                  ]}>
                    <Text>{countriesWithEmojis[country]} {country}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CountryScreen;
