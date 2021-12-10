import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Switch from '../../components/Switch';
import { useTheme } from '../../contexts/theme';
import { useAuth } from '../../contexts/auth';
import { useSnackbar } from '../../contexts/snackbar';

const Register = ({navigation}) => {
  const {theme, themeType, changeTheme} = useTheme();
  const {signUp} = useAuth();
  const {createSnackbar} = useSnackbar();
  const [keepLogin, setKeepLogin] = useState(false);
  const [darkTheme, setDarkTheme] = useState(themeType === 'dark' ? true : false);
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    login: '',
    password: '',
  });

  const changeDarkTheme = (value) => {
    setDarkTheme(value);

    if (value) {
      changeTheme('dark');
    } else {
      changeTheme('light');
    }
  }

  const handleChangeValue = (field, value) => setPayload({...payload, [field]: value});

  const handleSubmit = () => {

    if (!payload.name) {
      return createSnackbar({
        text: 'Insira um nome',
      });
    } else if (!payload.email) {
      return createSnackbar({
        text: 'Insira um e-mail',
      });
    } else if (!payload.login) {
      return createSnackbar({
        text: 'Insira um login',
      });
    } else if (!payload.password) {
      return createSnackbar({
        text: 'Insira uma senha',
      });
    }

    const submitPayload = {
      ...payload,
      keepLogin,
      darkTheme,
    };

    return signUp(submitPayload);
  }

  return (
      <ScrollView contentContainerStyle={styles(theme).container}>
        <LinearGradient
          colors={[theme.gradientFirstColor, theme.gradientSecondColor]}
          style={styles(theme).background}
        >
          <Text style={styles(theme).subtitle}>Cadastre suas informações</Text>
          <View style={styles(theme).form}>
            <Input
              value={payload.name}
              onChangeText={text => handleChangeValue('name', text)}
              placeholder="Nome"
            />
            <Input
              value={payload.email}
              onChangeText={text => handleChangeValue('email', text)}
              placeholder="E-mail"
            />
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
            <Switch value={keepLogin} onChangeValue={setKeepLogin}>
              Manter logado
            </Switch>
            <Switch value={darkTheme} onChangeValue={changeDarkTheme}>
              Tema escuro
            </Switch>
            <Button onPress={handleSubmit}>Criar</Button>
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
    padding: 16,
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

export default Register;