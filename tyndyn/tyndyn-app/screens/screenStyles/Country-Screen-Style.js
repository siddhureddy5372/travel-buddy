import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 30,
    width: '100%',
    backgroundColor: '#809BBF',
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
  row_title: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  HobbieSelect: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 7,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  selectedHobbie: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    opacity: 1,
  },
});

export default styles