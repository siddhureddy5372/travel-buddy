import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 40,
    backgroundColor: '#809BBF', // Cor de fundo cinzento
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    marginTop: 40,
    fontSize: 40,
  },

  text: {
    marginTop: 15,
    marginBottom: 60,
    fontSize: 15,
    marginRight: 70,
    textAlign: 'justify',
  },

  phoneInputContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: "black",
  },

  check: {
    marginTop: 15,
  },

  Validation_message: {
    marginTop: 15,
  },

  subtitle_container: {
    marginTop: 15,
    marginBottom: 200,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    fontSize: 15,
  },

  LockIcon: {
    fontSize: 15,
    marginLeft: 45,
    marginRight: 10,
  },

  circle: {
    width: 50,
    height: 50,
    marginRight: 45,
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

});

export default styles;
