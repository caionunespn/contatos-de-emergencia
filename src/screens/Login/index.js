import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Separator from '../../components/Separator';
import LinkButton from '../../components/LinkButton';
import { useTheme } from '../../contexts/theme';
import { useAuth } from '../../contexts/auth';
import { useSnackbar } from '../../contexts/snackbar';

const Login = ({navigation}) => {
  const {theme} = useTheme();
  const {createSnackbar} = useSnackbar();
  const {signIn} = useAuth();

  const [payload, setPayload] = useState({
    login: '',
    password: '',
  });

  const handleChangeValue = (field, value) => setPayload({...payload, [field]: value});

  const goToRegister = () => navigation.navigate("Register");

  const handleSubmit = () => {
    if (!payload.login) {
      return createSnackbar({
        text: 'Insira seu login',
      });
    } else if (!payload.password) {
      return createSnackbar({
        text: 'Insira sua senha',
      });
    }

    return signIn(payload);
  };

  return (
      <ScrollView contentContainerStyle={styles(theme).container}>
        <LinearGradient
          colors={[theme.gradientFirstColor, theme.gradientSecondColor]}
          style={styles(theme).background}
        >
          <Logo size={100} style={styles(theme).logo} />
          <Text style={styles(theme).title}>Bem-vindo(a)</Text>
          <Text style={styles(theme).subtitle}>Logue com sua conta</Text>
          <View style={styles(theme).form}>
            <Input
              value={payload.login}
              onChangeText={text => handleChangeValue('login', text)}
              placeholder="Login"
            />
            <Input
              value={payload.password}
              onChangeText={text => handleChangeValue('password', text)}
              secureTextEntry
              placeholder="Senha"
            />
            <Button onPress={handleSubmit}>Entrar</Button>
            <Separator />
            <LinkButton onPress={goToRegister}>Criar nova conta</LinkButton>
          </View>
        </LinearGradient>
      </ScrollView>
  );
}

const styles = (theme = null) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  logo: {
    marginBottom: 32,
  },  
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    fontSize: 28,
    color: theme.white,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: theme.white,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    backgroundColor: theme.white,
    width: '100%',
    borderRadius: 32,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Login;