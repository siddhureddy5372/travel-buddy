import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Common styles
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#809BBF',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  title: {
    marginTop: 25,
    fontSize: 37,
    fontWeight: '500',
  },
  text: {
    color: 'black',
    marginTop: 15,
    marginBottom: 40,
    fontSize: 16,
    marginRight: 70,
  },
  submission_container: {
    marginTop: 15,
    marginBottom: 260,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginRight: 80,
  },
  // Name submit page styles
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
  EyeIcon: {
    fontSize: 15,
    marginRight: 10,
    marginLeft: -25,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#98B1D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  // PAGE 3 --------------------------------------------------------------------------------
  title3: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 37,
    fontWeight: '500',
  },
  subtitle3: {
    fontSize: 17,
    marginRight: 15,
  },
  PhotoBox: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  Image_column1: {
    width: '50%',
    flexDirection: 'column',
  },
  Image_column2: {
    width: '50%',
    flexDirection: 'column',
  },
  ImageSquare: {
    width: '95%',
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
  },
  PhotoBox2: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  Image_column1_page2: {
    width: '33%',
    flexDirection: 'column',
  },
  Image_column2_page2: {
    width: '33%',
    flexDirection: 'column',
  },
  Image_column3_page2: {
    width: '33%',
    flexDirection: 'column',
  },
  ImageSquare2: {
    width: '90%',
    height: 90,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image2: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },

  // Page 4 styles ------------------------------------------------------------------------
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title_page2: {
    marginTop: 25,
    marginBottom: 40,
    fontSize: 34,
    fontWeight: '500',
  },
  submission_container2: {
    marginTop: 40,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  subtitle2: {
    fontSize: 15,
    marginRight: 15,
  },

  EyeIcon2: {
    fontSize: 15,
    marginRight: 10,
    marginLeft: -25,
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#98B1D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  birthbox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '75%',
  },
  date_page2: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    height: 50,
    marginTop: 3,
  },
  date1_page2: {
    fontSize: 18,
    width: 58,
  },
  date2_page2: {
    fontSize: 18,
    width: 63,
  },
  date3_page2: {
    fontSize: 18,
    width: 79,
  },

  // PAGE 5 ------------------------------------------------------------------------
  GenderContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  title_page3: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 35,
    fontWeight: '500',
  },

  subtitle_page3: {
    fontSize: 16,
    marginBottom: 30,
  },
  text3: {
    fontSize: 13,
    marginRight: 50,
  },
  CheckBox: {
    marginLeft: 0,
    height: 55,
    justifyContent: 'center',
    borderRadius: 20,
  },
  Box: {
    width: "100%",
  },
  CheckBoxText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10, // Ajuste conforme necessário
  },

  submission_container3: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },

  EyeIcon3: {
    fontSize: 15,
    marginRight: 10,
    marginLeft: -25,
  },
  circle3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#98B1D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  disabledButton: {
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.4,
  },

  //Page 6------------------------------------------------------------------------

  Container_page4: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  title_page4: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 33,
    fontWeight: '500',
  },
  subtitle_page4: {
    fontSize: 16,
    marginBottom: 30,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderDisplay: {
    width: '100%', // Ajuste conforme necessário
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 150,
  },
  genderBox: {
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 25,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderText: {
    fontSize: 17,
    color: 'white',
    padding: 7,
  },

  submission_container4: {
    width: '100%',
    marginLeft: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  circle4: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#98B1D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },

  //PAGE 7 -------------------------------------------------------------

  Container_page5: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  title_page5: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 33,
    fontWeight: '500',
  },
  subtitle_page5: {
    fontSize: 16,
    marginBottom: 13,
  },
  text5: {
    fontSize: 14,
    marginRight: 10,
  },
  submission_container5: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  EyeIcon5: {
    fontSize: 15,
    marginRight: 10,
    marginLeft: -25,
  },
  circle5: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#98B1D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  innerBox: {
    width: '100%', // Ajuste conforme necessário
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_Row_page5: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  column_child1_page5: {
    width: '80%',
    justifyContent: 'center',
  },
  column_child2_page5: {
    width: '20%',
    justifyContent: 'center',
  },
  subtitle_row_page5: {
    fontSize: 16,
    marginTop: 7,
    color: '#787878',
  },

  //PAGE 8 ---------------------------------------------------------------------------------------------

  Container_page6: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title_page6: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 33,
    fontWeight: '500',
  },
  subtitle_page6: {
    fontSize: 16,
    marginBottom: 13,
  },
  circle6: {
    marginTop: 100,
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button_page6: {
    width: '100%',
    height: 50,
    backgroundColor: 'white', // Cor de fundo dos botões em amarelo
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    borderRadius: 50,
  },
  ButtonText_page6: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  ButtonText_page7: {
    width: '100%',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;
