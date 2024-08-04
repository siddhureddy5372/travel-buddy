import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, Switch, ScrollView } from "react-native";
import styles from './screenStyles/Hobbies-Style';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox, Icon as RNEIcon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Hobbies = () => {

  const navigation = useNavigation();
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedHobbies_page2, setSelectedHobbies_page2] = useState([]);
  const [selectedHobbies_page3, setSelectedHobbies_page3] = useState([]);

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(item => item !== hobby));
    } else if (selectedHobbies.length < 3) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };
  const allHobbiesSelected_page2 = selectedHobbies.length === 3;

  const toggleHobby_page2 = (hobby_page2) => {
    if (selectedHobbies_page2.includes(hobby_page2)) {
      setSelectedHobbies_page2(selectedHobbies_page2.filter(item => item !== hobby_page2));
    } else if (selectedHobbies_page2.length < 5) {
      setSelectedHobbies_page2([...selectedHobbies_page2, hobby_page2]);
    }
  };
  const allHobbiesSelected = selectedHobbies_page2.length === 5;

  const toggleHobby_page3 = (hobby_page3) => {
    if (selectedHobbies_page3.includes(hobby_page3)) {
      setSelectedHobbies_page3(selectedHobbies_page3.filter(item => item !== hobby_page3));
    } else if (selectedHobbies_page3.length < 5) {
      setSelectedHobbies_page3([...selectedHobbies_page3, hobby_page3]);
    }
  };
  const allHobbiesSelected_page3 = selectedHobbies_page3.length === 5;

  //SAVE O CONTINENTE
  const saveAndNavigate = async (continent) => {
    try {
      await AsyncStorage.setItem('continent', continent);
      navigation.navigate('CountryScreen', { continent });
    } catch (error) {
      console.error('Erro ao salvar o continente:', error);
    }
  };
  const saveAndNavigate2 = async (continent) => {
    try {
      await AsyncStorage.setItem('continent', continent);
      navigation.navigate('WishToVisitScreen', { continent });
    } catch (error) {
      console.error('Erro ao salvar o continente:', error);
    }
  };
  //PAGE 1
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [step, setStep] = useState(1);

  //PAGE 3
  const [selectedSentimental, setSelectedSentimental] = useState(null);

  const handleCheck = (sentimental) => {
    setSelectedSentimental(sentimental);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };


  const get_info_countries = async () => {
    try {
      const has_been = await AsyncStorage.getItem('selectedCountriesVisited');
      const want_to_go = await AsyncStorage.getItem('selectedCountriesWishToVisit');
      const data = {
        has_been: has_been ? JSON.parse(has_been) : [],
        want_to_go: want_to_go ? JSON.parse(want_to_go) : []
      };
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching countries data from AsyncStorage:", error);
      return { has_been: [], want_to_go: [] };
    }
  };

  const handleSubmit = async () => {
    try {
      const combinedHobbies = [
        ...selectedHobbies,
        ...selectedHobbies_page2,
        ...selectedHobbies_page3
      ];

      const payload = {
        "preferences": combinedHobbies
      };
      console.log("!! ",payload)
      const response = await fetch('http://192.168.1.22:8000/api/preference/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log(response.body);
      if (!response.ok) {
        // Check if the response is not ok (e.g., 404 or 500 status)
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Hobbies submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting hobbies:", error);
    }
  };
  

  const submitcountries = async () => {
    try {
      const countriesData = await get_info_countries();
      const response = await fetch('http://192.168.1.22:8000/api/countries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(countriesData)
      });
      
      const data = await response.json();
      if (response.status == 200) {
        navigation.navigate('Profile');;
      } else {
        throw new Error(data.message || "Failed to save countries.");
      }
    } catch (error) {
      console.log("Error", error.toString());
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.column}>
          <ProgressBar progress={0.60} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
          <ScrollView>
            <View style={styles.container2}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  Tus intereses
                </Text>
                <Text style={styles.subtitle}>
                  Elige <Text style={{ fontWeight: '600' }}>hast 5</Text> para hacer amistades con{"\n"}
                  <Text style={{ fontWeight: '600' }}>intereses en común. </Text>
                  <Text>
                    Aparecerán en tu{"\n"}
                    perfil.
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.HobbieContainer}>
                <View style={styles.row_Hobbies_Box /*VIAJES*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Mi gusta...
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Playa') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Playa')}
                    >
                      <Text>
                        🏖️ Playa
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Acampada') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Acampada')}
                    >
                      <Text>
                        🏕️ Acampada
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Turismo_de_luxo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Turismo_de_luxo')}
                    >
                      <Text>
                        💵 Turismo de luxo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Grupo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Grupo')}
                    >
                      <Text>
                        👨‍👩‍👧‍👧 Grupo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Turismo_mochilero') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Turismo_mochilero')}
                    >
                      <Text>
                        🎒 Turismo mochilero
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Viajes_por_carretera') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Viajes_por_carretera')}
                    >
                      <Text>
                        🛣️ Viajes por carretera
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Viajes_urbanas') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Viajes_urbanas')}
                    >
                      <Text>
                        🌆 Viajes urbanas
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Escapadas_al_campo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Escapadas_al_campo')}
                    >
                      <Text>
                        🏠 Escapadas al campo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Pesca') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Pesca')}
                    >
                      <Text>
                        🎣 Pesca
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*¿Cómo te gusta viajar?*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      ¿Cómo te gusta viajar?
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Avión') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Avión')}
                    >
                      <Text>
                        ✈️ Avión
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Barco') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Barco')}
                    >
                      <Text>
                        🚢 Barco
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Tren') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Tren')}
                    >
                      <Text>
                        🚆 Tren
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Autobús') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Autobús')}
                    >
                      <Text>
                        🚌 Autobús
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Coche') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Coche')}
                    >
                      <Text>
                        🚗 Coche
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Ferry') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Ferry')}
                    >
                      <Text>
                        🚅 Ferry
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Crucero') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Crucero')}
                    >
                      <Text>
                        🛳️ Crucero
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /* ¿A dónde viajaste? */}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>¿A dónde viajaste?</Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate('África', 'visited')}
                    >
                      <Text>🌍 África</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate('Europa', 'visited')}
                    >
                      <Text>🌍 Europa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate('Asia', 'visited')}
                    >
                      <Text>🌏 Asia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate('América del Norte', 'visited')}
                    >
                      <Text>🌎 América del Norte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate('América del Sur', 'visited')}
                    >
                      <Text>🌎 América del Sur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate('Oceanía', 'visited')}
                    >
                      <Text>🌏 Oceanía</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.row_Hobbies_Box /* ¿A dónde quieres viajar? */}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>¿A dónde quieres viajar?</Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate2('África', 'wantToVisit')}
                    >
                      <Text>🌍 África</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate2('Europa', 'wantToVisit')}
                    >
                      <Text>🌍 Europa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate2('Asia', 'wantToVisit')}
                    >
                      <Text>🌏 Asia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate2('América del Norte', 'wantToVisit')}
                    >
                      <Text>🌎 América del Norte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate2('América del Sur', 'wantToVisit')}
                    >
                      <Text>🌎 América del Sur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, styles.selectedHobbie]}
                      onPress={() => saveAndNavigate2('Oceanía', 'wantToVisit')}
                    >
                      <Text>🌏 Oceanía</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.row}>
            <View style={styles.submit}>
              <View style={[styles.column_submit, styles.column_submit1]}>
                <TouchableOpacity onPress={handleNext}>
                  <Text>Omitir</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.column_submit, styles.column_submit2]}>
                <Text style={{ fontSize: 17 }}>
                  {selectedHobbies_page2.length}/5 seleccionados
                </Text>
              </View>
              <View style={[styles.column_submit, styles.column_submit3]}>
                <TouchableOpacity onPress={handleNext}
                  disabled={!allHobbiesSelected}>
                  <View style={[styles.circle, !allHobbiesSelected && styles.disabledButton]}>
                    <Icon name="check" style={!allHobbiesSelected ? { color: 'white' } : styles.iconEnabled} />
                  </View>
                </TouchableOpacity>
              </View>
              <Button title="Previous" onPress={handlePrevious} />
            </View>
          </View>
        </View>
      )}
      {step === 2 && (
        <View style={styles.column}>
          <ProgressBar progress={0.30} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
          <ScrollView>
            <View style={styles.container2}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  Tu vida
                </Text>
                <Text style={styles.subtitle}>
                  Elige <Text style={{ fontWeight: '600' }}>hast 3</Text> para hacer amistades con{"\n"}
                  <Text style={{ fontWeight: '600' }}>experiencias en común.</Text>
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.switch}>
                  <Switch
                    trackColor={{ true: 'black' }}
                    thumbColor={isEnabled ? 'white' : 'white'}
                    ios_backgroundColor="black"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text style={{ fontSize: 13, marginLeft: 10 }}>Mostar en mi perfil</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.HobbieContainer}>
                <View style={styles.row_Hobbies_Box /*ESTUDIOS*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Estudios
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('En_la_universidad') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('En_la_universidad')}
                    >
                      <Text>
                        🎓 En la universidad
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Estudios_universitarios') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Estudios_universitarios')}
                    >
                      <Text>
                        🎓 Estudios universitarios
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Me_acabo_de_graduar') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Me_acabo_de_graduar')}
                    >
                      <Text>
                        🎓 Me acabo de graduar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes(' Volviendo_a_estudiar') && styles.selectedHobbie]}
                      onPress={() => toggleHobby(' Volviendo_a_estudiar')}
                    >
                      <Text>
                        📚 Volviendo a estudiar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Trabajo_y_estudio') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Trabajo_y_estudio')}
                    >
                      <Text>
                        💼 Trabajo y estudio
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Título_de_postgrado') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Título_de_postgrado')}
                    >
                      <Text>
                        🎓 Título de postgrado
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Año_sabático') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Año_sabático')}
                    >
                      <Text>
                        🌎 Año sabático
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Estudiando_fuera') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Estudiando_fuera')}
                    >
                      <Text>
                        🌎 Estudiando fuera
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*TRABAJO*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Trabajo
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Mi_carrera_es_lo_primero') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Mi_carrera_es_lo_primero')}
                    >
                      <Text>
                        💻 Mi carrera es lo primero
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Nuevo_trabajo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Nuevo_trabajo')}
                    >
                      <Text>
                        🎉 Nuevo trabajo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Primer_trabajo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Primer_trabajo')}
                    >
                      <Text>
                        💻 Primer trabajo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Cambiando_de_empleo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Cambiando_de_empleo')}
                    >
                      <Text>
                        ↔️ Cambiando de empleo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Cambio_de_profesión') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Cambio_de_profesión')}
                    >
                      <Text>
                        💻 Cambio de profesión
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Militar') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Militar')}
                    >
                      <Text>
                        🎖️ Militar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Me_ocupo_de_mis_hijos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Me_ocupo_de_mis_hijos')}
                    >
                      <Text>
                        🏠 Me ocupo de mis hijos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Tengo_hijos_y_trabajo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Tengo_hijos_y_trabajo')}
                    >
                      <Text>
                        💻 Tengo hijos y trabajo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*LGBTQIA+*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      LGBTQIA+
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Explorando_mi_identidad') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Explorando_mi_identidad')}
                    >
                      <Text>
                        🏳️‍🌈 Explorando mi identidad
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Lider_de_la_comuninad') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Lider_de_la_comuninad')}
                    >
                      <Text>
                        🏳️‍🌈 Lider de la comuninad
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('En_transición') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('En_transición')}
                    >
                      <Text>
                        🏳️‍🌈 En transición
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Fuera_del_armario') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Fuera_del_armario')}
                    >
                      <Text>
                        🏳️‍🌈 Fuera del armario
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('En_cuestionamiento') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('En_cuestionamiento')}
                    >
                      <Text>
                        🏳️‍🌈 En cuestionamiento
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*AMOR PROPRIO*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Amor propio
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Empezar_de_cero') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Empezar_de_cero')}
                    >
                      <Text>
                        ✨ Empezar de cero
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Explorarando_mi_cultura') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Explorarando_mi_cultura')}
                    >
                      <Text>
                        💫 Explorarando mi cultura
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Disfruto_de_cada_momento') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Disfruto_de_cada_momento')}
                    >
                      <Text>
                        💫 Disfruto de cada momento
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Vida_sobria') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Vida_sobria')}
                    >
                      <Text>
                        💫 Vida sobria
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Mejorando_mi_vida') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Mejorando_mi_vida')}
                    >
                      <Text>
                        💫 Mejorando mi vida
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Positivismo_corporal') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Positivismo_corporal')}
                    >
                      <Text>
                        😍 Positivismo corporal
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Voy_a_terapia') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Voy_a_terapia')}
                    >
                      <Text>
                        💫 Voy a terapia
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies.includes('Explorando_la_espiritualidad') && styles.selectedHobbie]}
                      onPress={() => toggleHobby('Explorando_la_espiritualidad')}
                    >
                      <Text>
                        💫 Explorando la espiritualidad
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.row}>
            <View style={styles.submit}>
              <View style={[styles.column_submit, styles.column_submit1]}>
                <TouchableOpacity onPress={handleNext}>
                  <Text>Omitir</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.column_submit, styles.column_submit2]}>
                <Text style={{ fontSize: 17 }}>
                  {selectedHobbies.length}/3 seleccionados
                </Text>
              </View>
              <View style={[styles.column_submit, styles.column_submit3]}>
                <TouchableOpacity onPress={handleNext}
                  disabled={!allHobbiesSelected_page2}>
                  <View style={[styles.circle, !allHobbiesSelected_page2 && styles.disabledButton]}>
                    <Icon name="check" style={!allHobbiesSelected_page2 ? { color: 'white' } : styles.iconEnabled} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      {step === 3 && (
        <View style={styles.column}>
          <ProgressBar progress={0.60} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
          <ScrollView>
            <View style={styles.container2}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  Tus intereses
                </Text>
                <Text style={styles.subtitle}>
                  Elige <Text style={{ fontWeight: '600' }}>hast 5</Text> para hacer amistades con{"\n"}
                  <Text style={{ fontWeight: '600' }}>intereses en común. </Text>
                  <Text>
                    Aparecerán en tu{"\n"}
                    perfil.
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.HobbieContainer}>
                <View style={styles.row_Hobbies_Box /*CREATIVIDAD*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Creatividad
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Arte') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Arte')}
                    >
                      <Text>
                        🎨 Arte
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Diseño') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Diseño')}
                    >
                      <Text>
                        ✏️ Diseño
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Maquillaje') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Maquillaje')}
                    >
                      <Text>
                        💄 Maquillaje
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Fotografia') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Fotografia')}
                    >
                      <Text>
                        📷 Fotografia
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Escribir') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Escribir')}
                    >
                      <Text>
                        ✍️ Escribir
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Cantar') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Cantar')}
                    >
                      <Text>
                        🎤 Cantar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Bailar') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Bailar')}
                    >
                      <Text>
                        💃 Bailar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Manualidades') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Manualidades')}
                    >
                      <Text>
                        📎 Manualidades
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Hacer_videos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Hacer_videos')}
                    >
                      <Text>
                        📼 Hacer videos
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*DESPORTE y FITNESS*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Desporte y fitness
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Bádminton') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Bádminton')}
                    >
                      <Text>
                        🏸 Bádminton
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Ciclismo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Ciclismo')}
                    >
                      <Text>
                        🚴 Ciclismo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Gimnasio') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Gimnasio')}
                    >
                      <Text>
                        🏋️ Gimnasio
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('HIIT') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('HIIT')}
                    >
                      <Text>
                        💪 HIIT
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Senderismo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Senderismo')}
                    >
                      <Text>
                        👟 Senderismo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Montar_a_caballo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Montar_a_caballo')}
                    >
                      <Text>
                        🐎 Montar a caballo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Pilates') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Pilates')}
                    >
                      <Text>
                        🤸 Pilates
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Escalada') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Escalada')}
                    >
                      <Text>
                        🧗 Escalada
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*SALIDAS*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Salidas
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Conciertos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Conciertos')}
                    >
                      <Text>
                        🎟️ Conciertos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Monólogos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Monólogos')}
                    >
                      <Text>
                        🎙️ Monólogos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Festivales') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Festivales')}
                    >
                      <Text>
                        🎊 Festivales
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Museos_y_exposiciones') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Museos_y_exposiciones')}
                    >
                      <Text>
                        🏛️ Museos y exposiciones
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Teatro') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Teatro')}
                    >
                      <Text>
                        🎭 Teatro
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Discotecas') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Discotecas')}
                    >
                      <Text>
                        🕺 Discotecas
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Bares') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Bares')}
                    >
                      <Text>
                        🍻 Bares
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Clubs_de_lectura') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Clubs_de_lectura')}
                    >
                      <Text>
                        📖 Clubs de lectura
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*Cine*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Cine
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Comedia') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Comedia')}
                    >
                      <Text>
                        📺 Comedia
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Drama') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Drama')}
                    >
                      <Text>
                        📺 Drama
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Terror') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Terror')}
                    >
                      <Text>
                        📺 Terror
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Fantasía') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Fantasía')}
                    >
                      <Text>
                        📺 Fantasía
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Ciencia_ficción') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Ciencia_ficción')}
                    >
                      <Text>
                        📺 Ciencia ficción
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Comedia_romántica') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Comedia_romántica')}
                    >
                      <Text>
                        📺 Comedia romántica
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Bollywood') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Bollywood')}
                    >
                      <Text>
                        📺 Bollywood
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Indie') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Indie')}
                    >
                      <Text>
                        📺 Indie
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Acción') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Acción')}
                    >
                      <Text>
                        📺 Acción
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('K_dramas') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('K_dramas')}
                    >
                      <Text>
                        📺 K-dramas
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*MÚSICA*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Música
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Hip_Hop') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Hip_Hop')}
                    >
                      <Text>
                        🎵 Hip-Hop
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Rock') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Rock')}
                    >
                      <Text>
                        🎵 Rock
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Electrónica') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Electrónica')}
                    >
                      <Text>
                        🎵 Electrónica
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('R&B') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('R&B')}
                    >
                      <Text>
                        🎵 R&B
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Clásica') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Clásica')}
                    >
                      <Text>
                        🎵 Clásica
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Country') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Country')}
                    >
                      <Text>
                        🎵 Country
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Jazz') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Jazz')}
                    >
                      <Text>
                        🎵 Jazz
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Soul') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Soul')}
                    >
                      <Text>
                        🎵 Soul
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*MASCOTAS*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Mascotas
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Perros') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Perros')}
                    >
                      <Text>
                        🐶 Perros
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Gatos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Gatos')}
                    >
                      <Text>
                        🐱 Gatos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Conejos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Conejos')}
                    >
                      <Text>
                        🐇 Conejos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Pájaros') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Pájaros')}
                    >
                      <Text>
                        🐦 Pájaros
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Serpientes') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Serpientes')}
                    >
                      <Text>
                        🐍 Serpientes
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Lagartijas') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Lagartijas')}
                    >
                      <Text>
                        🦎 Lagartijas
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Tortugas') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Tortugas')}
                    >
                      <Text>
                        🐢 Tortugas
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Peces') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Peces')}
                    >
                      <Text>
                        🐟 Peces
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Hámsters') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Hámsters')}
                    >
                      <Text>
                        🐹 Hámsters
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Caballos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Caballos')}
                    >
                      <Text>
                        🐴 Caballos
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*ACTIVISMO SOCIALS*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Activismo social
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Derechos_LGBTQ+') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Derechos_LGBTQ+')}
                    >
                      <Text>
                        🏳️‍🌈 Derechos LGBTQ+
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Black_Lives_Matter') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Black_Lives_Matter')}
                    >
                      <Text>
                        🖤 Black Lives Matter
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Feminismo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Feminismo')}
                    >
                      <Text>
                        💛 Feminismo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Derecho_al_voto') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Derecho_al_voto')}
                    >
                      <Text>
                        ☑️ Derecho al voto
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Derechos_humanos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Derechos_humanos')}
                    >
                      <Text>
                        📜 Derechos humanos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Medio_ambiente') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Medio_ambiente')}
                    >
                      <Text>
                        🌎 Medio ambiente
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Stop_Asian_Hate') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Stop_Asian_Hate')}
                    >
                      <Text>
                        🚫 Stop Asian Hate
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Ecologista') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Ecologista')}
                    >
                      <Text>
                        ♻️ Ecologista
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Ecoturismo') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Ecoturismo')}
                    >
                      <Text>
                        ♻️ Ecoturismo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Sostenibilididad') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Sostenibilididad')}
                    >
                      <Text>
                        🌳 Sostenibilididad
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*ESPIRITUALIDADS*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Espiritualidad
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Astrologia') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Astrologia')}
                    >
                      <Text>
                        💫 Astrologia
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Ley_de_la_atracción') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Ley_de_la_atracción')}
                    >
                      <Text>
                        🧲 Ley de la atracción
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Espiritual') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Espiritual')}
                    >
                      <Text>
                        🔮 Espiritual
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Brujería') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Brujería')}
                    >
                      <Text>
                        🧹 Brujería
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*MI GUSTA*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Mi gusta
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Juegos_de_mesa') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Juegos_de_mesa')}
                    >
                      <Text>
                        🎲 Juegos de mesa
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Jardinería') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Jardinería')}
                    >
                      <Text>
                        🌱 Jardinería
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Videojuegos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Videojuegos')}
                    >
                      <Text>
                        🎮 Videojuegos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Veer_la_tele') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Veer_la_tele')}
                    >
                      <Text>
                        📺 Veer la tele
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Fumar') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Fumar')}
                    >
                      <Text>
                        🚬 Fumar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Noches_de_cine') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Noches_de_cine')}
                    >
                      <Text>
                        🍿 Noches de cine
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Leer') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Leer')}
                    >
                      <Text>
                        📚 Leer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*RASGOS de PERSONALIDAD*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Rasgos de personalidad
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page2.includes('Leal') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Leal')}
                    >
                      <Text>
                        💙 Leal
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Divertida') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Divertida')}
                    >
                      <Text>
                        💙 Divertida
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Alegre') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Alegre')}
                    >
                      <Text>
                        💙 Alegre
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Persona_tranquila') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Persona_tranquila')}
                    >
                      <Text>
                        💙 Persona tranquila
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Carismática') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Carismática')}
                    >
                      <Text>
                        💙 Carismática
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Encatadora') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Encatadora')}
                    >
                      <Text>
                        💙 Encatadora
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Relajada') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Relajada')}
                    >
                      <Text>
                        💙 Relajada
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Enérgica') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Enérgica')}
                    >
                      <Text>
                        💙 Enérgica
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.row_Hobbies_Box /*BIEN ESTAR*/}>
                  <View style={styles.row_Hobbie_title}>
                    <Text style={styles.title2}>
                      Bienestar
                    </Text>
                  </View>
                  <View style={styles.row_Hobbie_content}>
                    {/* CONTEUDO */}
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Aromaterapia') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Aromaterapia')}
                    >
                      <Text>
                        👃Aromaterapia
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('ASMR') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('ASMR')}
                    >
                      <Text>
                        👂ASMR
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Meditación') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page2('Meditación')}
                    >
                      <Text>
                        ✌️ Meditación
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Naturaleza') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Naturaleza')}
                    >
                      <Text>
                        🌿 Naturaleza
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Productos_biológicos') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Productos_biológicos')}
                    >
                      <Text>
                        🥬 Productos biológicos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Autocuidado') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Autocuidado')}
                    >
                      <Text>
                        💆‍♂️ Autocuidado
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Findes_de_spa') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Findes_de_spa')}
                    >
                      <Text>
                        🛁 Findes de spa
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.HobbieSelect, selectedHobbies_page3.includes('Llevar_un_diario') && styles.selectedHobbie]}
                      onPress={() => toggleHobby_page3('Llevar_un_diario')}
                    >
                      <Text>
                        🖋️ Llevar un diario
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.row}>
            <View style={styles.submit}>
              <View style={[styles.column_submit, styles.column_submit1]}>
                <TouchableOpacity onPress={handleNext}>
                  <Text>Omitir</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.column_submit, styles.column_submit2]}>
                <Text style={{ fontSize: 17 }}>
                  {selectedHobbies_page3.length}/5 seleccionados
                </Text>
              </View>
              <View style={[styles.column_submit, styles.column_submit3]}>
                <TouchableOpacity onPress={handleNext}
                  disabled={!allHobbiesSelected_page3}>
                  <View style={[styles.circle, !allHobbiesSelected_page3 && styles.disabledButton]}>
                    <Icon name="check" style={!allHobbiesSelected_page3 ? { color: 'white' } : styles.iconEnabled} />
                  </View>
                </TouchableOpacity>
              </View>
              <Button title="Previous" onPress={handlePrevious} />
            </View>
          </View>
        </View>
      )}
      {step === 4 && (
        <View>
          <ProgressBar progress={0.90} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
          <View style={styles.column_page3}>
            <View style={styles.container2_page3}>
              <Icon name="heart-o" style={styles.iconheart} />
              <View style={styles.row}>
                <Text style={[styles.title, { marginTop: 20 }]}>
                  Situación{"\n"}
                  sentimental
                </Text>
                <Text style={styles.subtitle_page3}>
                  Puedes cambiar esto más tarde.{"\n"}
                  Aparecerá en tu perfil.
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={styles.row}>
                <View style={styles.Box}>
                  <View style={styles.row}>
                    <View style={styles.Box}>
                      <CheckBox
                        center
                        iconRight
                        title="Soltera"
                        checked={selectedSentimental === 'Soltera'}
                        onPress={() => handleCheck('Soltera')}
                        containerStyle={styles.CheckBox}
                        checkedColor="black"   // Define a cor do ícone quando está marcado
                        uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                        textStyle={styles.CheckBoxText}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.Box}>
                      <CheckBox
                        center
                        iconRight
                        title="En una relación"
                        checked={selectedSentimental === 'En una relación'}
                        onPress={() => handleCheck('En una relación')}
                        containerStyle={styles.CheckBox}
                        checkedColor="black"   // Define a cor do ícone quando está marcado
                        uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                        textStyle={styles.CheckBoxText}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.Box}>
                      <CheckBox
                        center
                        iconRight
                        title="Comprometida"
                        checked={selectedSentimental === 'Comprometida'}
                        onPress={() => handleCheck('Comprometida')}
                        containerStyle={styles.CheckBox}
                        checkedColor="black"   // Define a cor do ícone quando está marcado
                        uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                        textStyle={styles.CheckBoxText}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.Box}>
                      <CheckBox
                        center
                        iconRight
                        title="Casada"
                        checked={selectedSentimental === 'Casada'}
                        onPress={() => handleCheck('Casada')}
                        containerStyle={styles.CheckBox}
                        checkedColor="black"   // Define a cor do ícone quando está marcado
                        uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                        textStyle={styles.CheckBoxText}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.Box}>
                      <CheckBox
                        center
                        iconRight
                        title="Es complicado"
                        checked={selectedSentimental === 'Es complicado'}
                        onPress={() => handleCheck('Es complicado')}
                        containerStyle={styles.CheckBox}
                        checkedColor="black"   // Define a cor do ícone quando está marcado
                        uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                        textStyle={styles.CheckBoxText}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.Box}>
                      <CheckBox
                        center
                        iconRight
                        title="Divorciada"
                        checked={selectedSentimental === 'Divorciada'}
                        onPress={() => handleCheck('Divorciada')}
                        containerStyle={styles.CheckBox}
                        checkedColor="black"   // Define a cor do ícone quando está marcado
                        uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                        textStyle={styles.CheckBoxText}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.row}>
              <View style={styles.submit}>
                <View style={[styles.column_submit, styles.column_submit1_page3]}>
                  <TouchableOpacity onPress={handleNext}>
                    <Text>Omitir</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.column_submit, styles.column_submit3_page3]}>
                  <TouchableOpacity
                    onPress={handleNext}
                    disabled={!selectedSentimental}
                  >
                    <View style={selectedSentimental ? styles.circle : [styles.circle, styles.disabledButton]}>
                      <Icon name="check"
                        style={selectedSentimental ? selectedSentimental : { color: 'white' }} />
                    </View>
                  </TouchableOpacity>
                </View>
                <Button title="Previous" onPress={handlePrevious} />
              </View>
            </View>
          </View>
        </View>
      )}
      {step === 5 && (
        <View style={styles.column}>
          <View style={styles.container_page4}>
            <View style={styles.row}>
              <View style={styles.circle_page4}>
                <Icon name="clock-o"
                  style={{ fontSize: 40, }}
                />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.title_page4}>
                72 horas para{"\n"}
                conectar
              </Text>
              <Text style={styles.subtitle_page4}>
                Los matches caducan en 72 horas si{"\n"}
                ninguna de las partes intercambia{"\n"}
                ningún mensaje.
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.Button_page4} onPress={handleNext}>
                <Text style={styles.ButtonText_page4}>
                  Entendido
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button title="Previous" onPress={handlePrevious} />
        </View>
      )}
      {step === 6 && (
        <View style={styles.column}>
          <View style={styles.container_page5}>
            <View style={styles.row}>
              <Text style={styles.title_page5}>
                SER AMABLE{"\n"}
                ESTÁ{"\n"}
                DE MODA
              </Text>
              <Text style={styles.subtitle_page5}>
                Aquí tratamos a todas la personas{"\n"}
                con amabilidad y respeto; sin importar{"\n"}
                su raza, nacionalidad, etnia, color de{"\n"}
                piel, capacidad, talla, sexo, identidad{"\n"}
                de género u orientación sexual.
              </Text>
              <Text style={styles.subtitle_page5}>
                Para que Tyndyn siga siendo un lugar{"\n"}
                seguro e inclusivo donde hacer{"\n"}
                amistades, te pedimos que sigas{"\n"}
                nuestras <Text style={{ fontWeight: 500, textDecorationLine: 'underline' }}>normas</Text> y seas amable.
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.Button_page5} onPress={handleNext}>
                <Text style={styles.ButtonText_page4}>
                  Acepto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button title="Previous" onPress={handlePrevious} />
        </View>
      )}
      {step === 7 && (
        <View style={styles.column}>
          <View style={styles.container_page6}>
            <View style={styles.row}>
              <View style={styles.circle_page6}>
                <Icon name="lock"
                  style={{ fontSize: 40, }}
                />
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.title_page6}>
                Avisos de privacidad
              </Text>
              <View style={{ width: '100%' }}>
                <View style={styles.subtitleBox}>
                  <Text style={styles.subtitle_page6}>
                    <Text style={{ fontWeight: 600 }}>
                      ¿Qué va pasar{"\n"}
                    </Text>
                    Tu perfil se verá automáticamente en el{"\n"}
                    modo BFF aquí, así como en nuestra{"\n"}
                    nueva app Tyndyn For Friends.
                  </Text>
                </View>
                <View style={styles.subtitleBox}>
                  <Text style={styles.subtitle_page6}>
                    <Text style={{ fontWeight: 600 }}>
                      ¿Por qué hacemos esto?{"\n"}
                    </Text>
                    Mostramos los perfiles de BFF en{"\n"}
                    ambas apps para que todo el mundo{"\n"}
                    pueda conecer a más posibles{"\n"}
                    amistades. Nuestra base jurídica para{"\n"}
                    ello, según la ley de protección de{"\n"}
                    datos, son nuestros intereses legítimos.
                  </Text>
                </View>
                <View style={styles.subtitleBox}>
                  <Text style={styles.subtitle_page6}>
                    BFF y Tyndyn For Friends son{"\n"}
                    propriedad de Upsen Consulting Group. Para más{"\n"}
                    información sobre perfiles{"\n"}
                    compartidos, <Text style={{ fontWeight: 500, textDecorationLine: 'underline' }}>consulta nuestras Preg...</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.Button_page6} onPress={() => {
                  handleSubmit();
                  submitcountries();
                }}>
                <Text style={styles.ButtonText_page4}>
                  Entendido
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      )}
    </View >
  );
};
export default Hobbies;