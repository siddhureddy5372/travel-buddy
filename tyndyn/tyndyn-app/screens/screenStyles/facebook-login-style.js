import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    width: 200,
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});

export default styles