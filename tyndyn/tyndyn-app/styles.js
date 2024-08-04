import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#809BBF', // Cor de fundo cinza
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 50,
        color: 'white',
    },
    companyName: {
        marginTop: 40,
        fontSize: 35,
    },
    logo: {
        width: 100, // Defina o tamanho do logo aqui
        height: 100, // Defina o tamanho do logo aqui
        borderRadius: 50, // Torna a imagem circula
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#F1CD5C', // Cor de fundo dos botões em amarelo
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },

    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    appleLoginButton: {
        backgroundColor: 'black',
    },
    phoneLoginButton_background: {
        backgroundColor: 'white',
        color: 'black',
    },

    phoneLoginButton_innerText: {
        color: 'black',
    },

    phoneLoginButton_iconLogo: {
        color: 'black',
    },

    facebookLoginButton: {
        backgroundColor: 'blue',
    },
    IconLogo: {
        color: "white",
    },
});

export default styles;
