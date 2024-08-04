import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    width: '100%',
    backgroundColor: '#809BBF',
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 50,
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
    marginBottom: 20,
    fontSize: 35,
    fontWeight: '500',
  },
  title2: {
    fontSize: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle2: {
    fontSize: 16,
    marginBottom: 20,
  },
  HobbieContainer: {
    width: '100%',
  },
  selectedHobbie: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    opacity: 1,
  },
  row_Hobbies_Box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 40,

  },
  row_Hobbie_title: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  row_Hobbie_content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '94%',
  },

  HobbieSelect: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 7,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  submit: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  disabledButton: {
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.4,
  },

  column_submit: {
    justifyContent: 'center',
    paddingVertical: 20,
    height: 70,
  },

  column_submit1: {
    flexDirection: 'column',
    width: '20%'
  },
  column_submit2: {
    flexDirection: 'colum',
    alignItems: 'flex-end',
    width: '60%',
  },
  column_submit3: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '20%',
  },

  //PAGE 3 ------------------------------------------------------------------------------------------
  container2_page3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  column_page3: {
    flex: 1,
    marginHorizontal: 25,
    flexDirection: 'column',
  },
  iconheart: {
    fontSize: 40,
  },
  subtitle_page3: {
    fontSize: 16,
  },
  Box: {
    width: "100%",
  },
  row_Box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: 'yellow',
  },
  row_submit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: 'cyan',
  },
  CheckBox: {
    marginLeft: 0,
    marginRight: 0,
    height: 55,
    justifyContent: 'center',
    borderRadius: 15,
  },
  CheckBoxText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10, // Ajuste conforme necessário
  },
  column_submit1_page3: {
    flexDirection: 'column',
    width: '50%'
  },
  column_submit3_page3: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '50%',
  },

  //PAGE 4 -------------------------------------------------------------------------
  container_page4: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 30,
  },
  circle_page4: {
    marginTop: 100,
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_page4: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 33,
    fontWeight: '600',
  },
  subtitle_page4: {
    fontSize: 16,
    marginBottom: 70,
  },
  Button_page4: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    borderRadius: 50,
  },
  ButtonText_page4: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  //PAGE 5----------------------------------------------------------------------

  container_page5: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
  },
  title_page5: {
    color: 'white',
    marginTop: 100,
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '500',
    width: '100%',
    textShadowColor: '#000',
    textShadowOffset: { width: 4, height: 3 },
    textShadowRadius: 0,
  },
  subtitle_page5: {
    fontSize: 16,
    marginBottom: 20,
  },
  Button_page5: {
    width: '35%',
    height: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
  },

  //PAGE 6------------------------------------------------------------

  container_page6: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  title_page6: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: '600',
    width: '100%',
  },
  subtitle_page6: {
    width: '100%',
    fontSize: 16,
  },
  circle_page6: {
    marginTop: 35,
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 50,
  },
  subtitleBox: {
    marginTop: 10,
  },
});

export default styles;