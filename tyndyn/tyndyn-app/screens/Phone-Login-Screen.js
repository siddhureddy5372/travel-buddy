import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from '@react-navigation/native'; // Importação do hook useNavigation
import styles from './screenStyles/phone-login-styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const PhoneLoginScreen = () => {

  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  phoneInput = useRef(null);
  {/* Siddhu start*/ }

  const sendPhoneNumber = async () => { //TEMPORARY 
    navigation.navigate('NameSubmit') //<----- pires IGNORE VERIFICATION 
    console.log('Name Working');//<----- pires 
  }

  const sendPhoneNumber2 = async () => {
    try {
      const response = await fetch('http://192.168.1.22:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone_number: formattedValue, facebook_token: null, apple_id: null })
      });
      console.log("Calling The api " + formattedValue);
      const data = await response.json();
      console.log(response.status);
      if (response.status == 201) {
        navigation.navigate('NameSubmit') //<----- pires IGNORE VERIFICATION 
        console.log('Name Working');//<----- pires 
      } else if (response.status == 200) {
        navigation.navigate("Profile");
      } else {
        throw new Error(data.message || "Failed to save phone number");
      }
    } catch (error) {
      Alert.alert("Error", error.toString());
    }
  };

  {/* Siddhu end */ }
  const handleCheckPhoneNumber = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    setShowMessage(true);
    setValid(checkValid ? checkValid : false);
    if (checkValid) {
      console.log("Calling Submit number");
      sendPhoneNumber();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>¿Cuál es tu número?</Text>
        <Text style={styles.text}>
          Protegemos nuestra comunidad garantizando que cada perfil en Tyndyn es
          real.
        </Text>
        <View style={styles.phoneInputContainer}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="ES"
            placeholder="Numéro de Teléfono"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
        </View>
        <TouchableOpacity onPress={handleCheckPhoneNumber}>
          <Text style={styles.check}>Check</Text>
        </TouchableOpacity>
        {showMessage && (
          <View style={styles.Validation_message}>
            <Text>Value: {value}</Text>
            <Text>Formatted Value: {formattedValue}</Text>
            <Text>Valid: {valid ? "true" : "false"}</Text>
          </View>
        )}
        <View style={styles.subtitle_container}>
          <Icon name="lock" style={styles.LockIcon} />
          <Text style={styles.subtitle}>Nunca lo compartiremos con nadie más y no aparecerá en tu perfil</Text>
          <TouchableOpacity
            disabled={!formattedValue}
            onPress={sendPhoneNumber2}>
            <View style={formattedValue ? styles.circle : [styles.circle, styles.disabledButton]}>
              <Icon name="check"
                style={formattedValue ? formattedValue : { color: 'white' }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneLoginScreen;