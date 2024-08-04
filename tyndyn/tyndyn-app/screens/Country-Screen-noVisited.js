import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { countries, countriesWithEmojis } from './countrys'; // Importando os dados de países e emojis
import styles from './screenStyles/Country-Screen-Style'; // Estilos personalizados

const WishToVisitScreen = () => {
  const [continent, setContinent] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [selectedCountriesWishToVisit, setSelectedCountriesWishToVisit] = useState([]);

  useEffect(() => {
    const getContinent = async () => {
      try {
        const storedContinent = await AsyncStorage.getItem('continent');
        console.log('Stored Continent:', storedContinent); // Log para verificar o valor de storedContinent
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

    const getSelectedCountriesWishToVisit = async () => {
      try {
        const selectedCountriesJSON = await AsyncStorage.getItem('selectedCountriesWishToVisit');
        if (selectedCountriesJSON) {
          setSelectedCountriesWishToVisit(JSON.parse(selectedCountriesJSON));
        }
      } catch (error) {
        console.error('Erro ao recuperar países que deseja visitar:', error);
      }
    };

    getContinent();
    getSelectedCountriesWishToVisit();
  }, []);

  const toggleCountrySelectionWishToVisit = async (countryName) => {
    setSelectedCountriesWishToVisit((prevSelected) => {
      if (prevSelected.includes(countryName)) {
        const updatedSelected = prevSelected.filter((name) => name !== countryName);
        saveSelectedCountriesWishToVisit(updatedSelected);
        console.log('Países que deseja visitar selecionados:', updatedSelected); // Console log dos países que deseja visitar selecionados
        return updatedSelected;
      } else {
        const updatedSelected = [...prevSelected, countryName];
        saveSelectedCountriesWishToVisit(updatedSelected);
        console.log('Países que deseja visitar selecionados:', updatedSelected); // Console log dos países que deseja visitar selecionados
        return updatedSelected;
      }
    });
  };

  const saveSelectedCountriesWishToVisit = async (selected) => {
    try {
      await AsyncStorage.setItem('selectedCountriesWishToVisit', JSON.stringify(selected));
    } catch (error) {
      console.error('Erro ao salvar países que deseja visitar:', error);
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
                <TouchableOpacity key={index} onPress={() => toggleCountrySelectionWishToVisit(country)}>
                  <View style={[
                    styles.HobbieSelect,
                    selectedCountriesWishToVisit.includes(country) && styles.selectedHobbie,
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

export default WishToVisitScreen;
