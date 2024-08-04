import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch, Alert, Image } from "react-native";
import styles from './screenStyles/NameSubmit-Style';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox, Icon as RNEIcon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'; // Importação do hook useNavigation
import * as ImagePicker from "expo-image-picker";
import { Platform } from 'react-native';

const NameSubmit = () => {

  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [step, setStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);

  //IMAGE SAVING (i think xD)
  //IMAGES ___________________________________________________________________
  const [files, setFiles] = useState(Array(8).fill(null));
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestMediaLibraryPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permission to upload images."
        );
      }
    };

    // Chama a função assíncrona imediatamente
    requestMediaLibraryPermissions();
  }, [files]);

  const pickImage = async (index) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newFiles = [...files];
        // Ensure the URI is correctly formatted
        const uri = Platform.OS === 'android' ? result.assets[0].uri : result.assets[0].uri.replace('file://', '');
        newFiles[index] = uri;
        setFiles(newFiles);
        setError(null);
        console.log("Updated files array:", newFiles); // Log the updated array
      } else {
        setError("No image selected or operation cancelled.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while picking the image.");
    }
  };

  const allImagesAdded = files[1] && files[2];
  const allImagesAdded_page2 = files.slice(3, 9).reduce((count, file) => file ? count + 1 :count,0)>=3;

  //IMAGES ___________________________________________________________________
  const [selectedGender, setSelectedGender] = useState(null);

  const handleCheck = (gender) => {
    setSelectedGender(gender);
    console.log(selectedGender);
  };

  const [selectedModo, setSelectedModo] = useState(null);

  const handleCheckModo = (modo) => {
    setSelectedModo(modo);
    console.log(selectedModo);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [check4] = useState(false);
  const [check5] = useState(false);
  const [check6] = useState(false);

  const navigation = useNavigation(); // Obtém o objeto de navegação
  const Hobbies = () => {
    navigation.navigate('HobbieScreen'); // Redireciona para a tela PhoneLogin
    console.log('Hobbie navigation working');
  };
  const handleFocus = () => {
    setIsFocused(true);
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

  const handleImagesSubmit = async () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      if (file) {
        formData.append('images', {
          uri: Platform.OS === 'android' ? file : file.replace('file://', ''),
          type: 'image/jpeg',  // Adjust the type according to your file type
          name: `photo_${index}.jpg`,  // Adjust the name as needed
        });
        console.log(`Appending file ${index}:`, file);
      }
    });
  
    try {
      console.log('Sending request to API...', formData);
      const response = await fetch('http://192.168.1.22:8000/api/upload/image/', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        throw new Error(`Failed to upload images: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.22:8000/api/profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: name,
          dob: `${year}-${month}-${day}`,
          gender: selectedGender,
          show_gender: isEnabled,
          notifications: notifications,
          mode: check4 ? "Date" : check5 ? "BFF" : check6 ? "Bizz" : "",
          has_created_profile: true
        })
      });

      const data = await response.json();

      console.log("Profile submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {step === 1 && (
          <View style={styles.column}>
            <View style={styles.Container_page6}>
              <View style={styles.row}>
                <View style={styles.circle6}>
                  <Icon name="bell"
                    style={{ fontSize: 40, }}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.title_page6}>
                  Activa las{"\n"}
                  notificaciones
                </Text>
                <Text style={styles.subtitle_page6}>
                  Te informaremos de tus matches y{"\n"}
                  mensajes nuevos.
                </Text>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.Button_page6} onPress={() => {
                  handleNext();
                  setNotifications(true);
                }}>
                  <Text style={styles.ButtonText_page6}>
                    Permitir notificaciones
                  </Text>
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                  <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.ButtonText_page7}>
                      Ahora no
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        {step === 2 && (
          <View style={styles.column}>
            <ProgressBar progress={0.15} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
            <Text style={styles.title}>¿Cómo te llamas?</Text>
            <Text style={styles.text}>Ten en cuenta que no podrás cambiarlo más adelante.</Text>
            <Text style={{ marginLeft: 8 }}>Nombre</Text>
            <View>
              <TextInput
                style={styles.input}
                value={name}
                keyboardType='default'
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={setName}
              />
              <View style={styles.bottomBorder} />
            </View>
            <View style={styles.submission_container}>
              <Icon name="eye" style={styles.EyeIcon} />
              <Text style={styles.subtitle}>Este aparecerá en tu perfil.</Text>
              <TouchableOpacity onPress={handleNext}
                disabled={!name}
              >
                <View style={name ? styles.circle : [styles.circle, styles.disabledButton]}>
                  <Icon name="check"
                    style={name ? name : { color: 'white' }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 3 && (
          <View style={styles.column}>
            <ProgressBar progress={0.25} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
            <View style={styles.row}>
              <Text style={styles.title3}>
                Añade tus dos{"\n"}
                primeras fotos
              </Text>
              <Text style={[styles.subtitle3, { marginBottom: 10 }]}>
                ¡Y que salgas tú! Ya seas tú con tu{"\n"}
                mascota, de tapas o en tu rincón{"\n"}
                favorito🐈🍕🏖️
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.PhotoBox}>
                <View style={styles.Image_column1}>
                  <TouchableOpacity onPress={() => pickImage(1)}>
                    <View style={styles.ImageSquare}>
                      {!files[1] && <Text style={{ fontSize: 30 }}>+</Text>}
                      {files[1] && (
                        <View>
                          <Image source={{ uri: files[1] }} style={styles.image} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.Image_column2}>
                  <TouchableOpacity onPress={() => pickImage(2)}>
                    <View style={styles.ImageSquare}>
                      {!files[2] && <Text style={{ fontSize: 30 }}>+</Text>}
                      {files[2] && (
                        <View>
                          <Image source={{ uri: files[2] }} style={styles.image} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.submission_container4, { marginTop: 130 }]}>
                <TouchableOpacity onPress={handleNext}
                  disabled={!allImagesAdded}>
                  <View style={[styles.circle, !allImagesAdded && styles.disabledButton]}>
                    <Icon name="check" style={!allImagesAdded ? { color: 'white' } : styles.iconEnabled} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {step === 4 && (
          <View style={styles.column}>
            <ProgressBar progress={0.35} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
            <View style={styles.row}>
              <Text style={styles.title3}>
                Añade más fotos
              </Text>
              <Text style={[styles.subtitle3, { marginBottom: 40 }]}>
                Los perfiles con más de 3 fotos{"\n"}
                tienen un 43% más de{"\n"}
                probabilidades de hacer match.{"\n"}
                Puedes cambiarlas más adelante.
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.row}>
                <View style={styles.PhotoBox2}>
                  <View style={styles.Image_column1_page2}>
                    <TouchableOpacity onPress={() => pickImage(3)}>
                      <View style={styles.ImageSquare2}>
                        {!files[3] && <Text style={{ fontSize: 30 }}>+</Text>}
                        {files[3] && (
                          <View>
                            <Image source={{ uri: files[3] }} style={styles.image2} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Image_column2_page2}>
                    <TouchableOpacity onPress={() => pickImage(4)}>
                      <View style={styles.ImageSquare2}>
                        {!files[4] && <Text style={{ fontSize: 30 }}>+</Text>}
                        {files[4] && (
                          <View>
                            <Image source={{ uri: files[4] }} style={styles.image2} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Image_column2_page2}>
                    <TouchableOpacity onPress={() => pickImage(5)}>
                      <View style={styles.ImageSquare2}>
                        {!files[5] && <Text style={{ fontSize: 30 }}>+</Text>}
                        {files[5] && (
                          <View>
                            <Image source={{ uri: files[5] }} style={styles.image2} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.PhotoBox2}>
                  <View style={styles.Image_column1_page2}>
                    <TouchableOpacity onPress={() => pickImage(6)}>
                      <View style={styles.ImageSquare2}>
                        {!files[6] && <Text style={{ fontSize: 30 }}>+</Text>}
                        {files[6] && (
                          <View>
                            <Image source={{ uri: files[6] }} style={styles.image2} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Image_column2_page2}>
                    <TouchableOpacity onPress={() => pickImage(7)}>
                      <View style={styles.ImageSquare2}>
                        {!files[7] && <Text style={{ fontSize: 30 }}>+</Text>}
                        {files[7] && (
                          <View>
                            <Image source={{ uri: files[7] }} style={styles.image2} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Image_column2_page2}>
                    <TouchableOpacity onPress={() => pickImage(8)}>
                      <View style={styles.ImageSquare2}>
                        {!files[8] && <Text style={{ fontSize: 30 }}>+</Text>}
                        {files[8] && (
                          <View>
                            <Image source={{ uri: files[8] }} style={styles.image2} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.submission_container4, { marginTop: 100 }]}>
                <TouchableOpacity onPress={handleNext}
                  disabled={!allImagesAdded_page2}>
                  <View style={[styles.circle, !allImagesAdded_page2 && styles.disabledButton]}>
                    <Icon name="check" style={!allImagesAdded_page2 ? { color: 'white' } : styles.iconEnabled} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {step === 5 && (
          <View style={styles.column}>
            <ProgressBar progress={0.50} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
            <Text style={styles.title_page2}>¿Cuál es tu fecha de nacimiento?</Text>
            <View style={styles.row}>
              <View style={styles.birthbox}>
                <View style={styles.column}>
                  <Text style={{ marginLeft: 15 }}>Dia</Text>
                  <TextInput
                    style={[styles.date_page2, styles.date1_page2]}
                    placeholder='DD'
                    placeholderTextColor={'#999999'}
                    value={day}
                    keyboardType='number-pad'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={setDay}
                    maxLength={2}
                  />
                </View>
                <View style={styles.column}>
                  <Text style={{ marginLeft: 15 }}>Mes</Text>
                  <TextInput
                    style={[styles.date_page2, styles.date2_page2]}
                    placeholder='MM'
                    placeholderTextColor={'#999999'}
                    value={month}
                    keyboardType='number-pad'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={setMonth}
                    maxLength={2}
                  />
                </View>
                <View style={styles.column}>
                  <Text style={{ marginLeft: 15 }}>Año</Text>
                  <TextInput
                    style={[styles.date_page2, styles.date3_page2]}
                    placeholder='AAAA'
                    placeholderTextColor={'#999999'}
                    value={year}
                    keyboardType='number-pad'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={setYear}
                    maxLength={4}
                  />
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.submission_container2}>
                <Icon name="eye" style={styles.EyeIcon2} />
                <Text style={styles.subtitle2}>Tus possibles matches solo véran tu{"\n"}edad, no tu fecha de nacimiento</Text>
                <TouchableOpacity onPress={handleNext}
                  disabled={!day || !month || !year}              >
                  <View style={!day || !month || !year ? [styles.circle2, styles.disabledButton] : styles.circle2}>
                    <Icon name="check"
                      style={year ? year : { color: 'white' }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Button title="Previous" onPress={handlePrevious} />
          </View>
        )}
        {step === 6 && (
          <View style={styles.column}>
            <ProgressBar progress={0.65} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20, marginBottom: 20 }} />
            <View style={styles.GenderContainer}>
              <View style={styles.row}>
                <Text style={styles.title_page3}>¿Cuál es tu identidad de género?</Text>
                <Text style={styles.subtitle_page3}>
                  Elige lo que mejor te describa.{"\n"}
                  Luego añade más informacíon sobre{"\n"}
                  tu género si quieres. Conece lo que{"\n"}
                  significa
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.row}>
                  <View style={styles.Box}>
                    <CheckBox
                      center
                      iconRight
                      title="Mujer"
                      checked={selectedGender === 'Mujer'}
                      onPress={() => handleCheck('Mujer')}
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
                      title="Hombre"
                      checked={selectedGender === 'Hombre'}
                      onPress={() => handleCheck('Hombre')}
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
                      title="No binario"
                      checked={selectedGender === 'No Binario'}
                      onPress={() => handleCheck('No Binario')}
                      containerStyle={styles.CheckBox}
                      checkedColor="black"   // Define a cor do ícone quando está marcado
                      uncheckedColor="black" // Define a cor do ícone quando está desmarcado
                      textStyle={styles.CheckBoxText}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.submission_container3}>
                  <Icon name="eye" style={styles.EyeIcon3} />
                  <Text style={styles.text3}>
                    Siempre puedes actualizar esto más{"\n"}
                    tarde. Estamos contigo.
                  </Text>
                  <TouchableOpacity
                    onPress={handleNext}
                    disabled={!selectedGender}
                  >
                    <View style={selectedGender ? styles.circle3 : [styles.circle3, styles.disabledButton]}>
                      <Icon name="check"
                        style={selectedGender ? selectedGender : { color: 'white' }} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Button title="Previous" onPress={handlePrevious} />
          </View>
        )}
        {step === 7 && (
          <View style={styles.column}>
            <ProgressBar progress={0.75} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20 }} />
            <View style={styles.Container_page4}>
              <View style={styles.row}>
                <Text style={styles.title_page4}>¿Quieres mostrar tu género en tu perfil?</Text>
                <Text style={styles.subtitle_page4}>
                  Esto depende totalmente de ti y de{"\n"}
                  lo que te apetezca hacer.
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.switch}>
                  <Switch
                    trackColor={{ true: 'grey' }}
                    thumbColor={isEnabled ? 'white' : 'white'}
                    ios_backgroundColor="grey"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text style={{ fontSize: 17, marginLeft: 10 }}>Oculto en tu perfil</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.genderDisplay}>
                  <Text style={{ opacity: isEnabled ? 1 : 0.3 }}>Aparecerá como:</Text>
                  <View style={[styles.genderBox, { opacity: isEnabled ? 1 : 0.3 }]}>
                    <Text style={styles.genderText}>{selectedGender}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.submission_container4}>
                  <TouchableOpacity onPress={handleNext} >
                    <View style={styles.circle4}>
                      <Icon name="check" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Button title="Previous" onPress={handlePrevious} />
          </View>
        )}
        {step === 8 && (
          <View style={styles.column}>
            <ProgressBar progress={0.90} theme={{ colors: { primary: 'black' } }} style={{ marginTop: 20 }} />
            <View style={styles.Container_page5}>
              <View style={styles.row}>
                <Text style={styles.title_page5}>Escoge un modo</Text>
                <Text style={styles.subtitle_page5}>
                  ¡Tyndyn te permite entablar{"\n"}
                  relaciones de todo tipo! Una vez{"\n"}
                  esté listo tu perfil, podrás cambiar{"\n"}
                  de un modo a otro.
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.Box_page5}>
                  <View style={styles.row /*BOX ROW 1*/}>
                    <View style={styles.innerBox}>
                      <View style={styles.column_child1_page5}>
                        <Text style={styles.title_Row_page5}>Date</Text>
                        <Text style={styles.subtitle_row_page5}>
                          Encuentra a ese alguien{"\n"}
                          especial
                        </Text>
                      </View>
                      <View style={styles.column_child2_page5}>
                        <CheckBox
                          checkedColor="black"
                          uncheckedColor="black"
                          checked={selectedModo === 'Date'}
                          onPress={() => handleCheckModo('Date')}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.row /*BOX ROW 2*/}>
                    <View style={styles.innerBox}>
                      <View style={styles.column_child1_page5}>
                        <Text style={styles.title_Row_page5}>BFF</Text>
                        <Text style={styles.subtitle_row_page5}>
                          Has nuevas amistades en cada etapa de tu vida
                        </Text>
                      </View>
                      <View style={styles.column_child2_page5}>
                        <CheckBox
                          checkedColor="black"
                          uncheckedColor="black"
                          checked={selectedModo === 'BFF'}
                          onPress={() => handleCheckModo('BFF')}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.row /*BOX ROW 3*/}>
                    <View style={styles.innerBox}>
                      <View style={styles.column_child1_page5}>
                        <Text style={styles.title_Row_page5}>Bizz</Text>
                        <Text style={styles.subtitle_row_page5}>
                          Lleva tu carrera al siguiente nivel
                        </Text>
                      </View>
                      <View style={styles.column_child2_page5}>
                        <CheckBox
                          checkedColor="black"
                          uncheckedColor="black"
                          checked={selectedModo === 'Bizz'}
                          onPress={() => handleCheckModo('Bizz')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.submission_container5}>
                  <Icon name="eye" style={styles.EyeIcon5} />
                  <Text style={styles.text5}>
                    Solo se mostrará tu perfil a la gente que{"\n"}
                    esté en el mismo modo.</Text>
                  <TouchableOpacity
                    disabled={!selectedModo}
                    onPress={handleNext} >
                    <View style={selectedModo ? styles.circle5 : [styles.circle5, styles.disabledButton]}>
                      <Icon name="check"
                        style={selectedModo ? selectedModo : { color: 'white' }} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Button title="Previous" onPress={handlePrevious} />
          </View>
        )}
        {step === 9 && (
          <View style={styles.column}>
            <View style={styles.Container_page6}>
              <View style={styles.row}>
                <View style={styles.circle6}>
                  <Icon name="comment"
                    style={{ fontSize: 40, }}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.title_page6}>
                  Haz nuevas {"\n"}
                  amistades en cada {"\n"}
                  etapa de tu vida
                </Text>
                <Text style={styles.subtitle_page6}>
                  {selectedModo} te ayudará a hacer nuevas{"\n"}
                  amistades, tanto si acabas de{"\n"}
                  mudarte a otra ciudad como si solo{"\n"}
                  quieres expandir tu círculo social.
                </Text>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.Button_page6} onPress={() => {
                  handleImagesSubmit();
                  handleSubmit();
                  Hobbies();
                }}>
                  <Text style={styles.ButtonText_page6}>
                    Entendido
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button title="Previous" onPress={handlePrevious} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback >
  );
};

export default NameSubmit;
