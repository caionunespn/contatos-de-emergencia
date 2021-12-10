import React, {useEffect} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Routes from './src/navigation';
import ContextProvider from './src/contexts';

export default function App() {

  useEffect(() => {
    // AsyncStorage.clear();
    setEnvironment();
  }, []);

  const setEnvironment = async () => {
    const users = await AsyncStorage.getItem("@ContatosEmergencia:users");
    const contacts = await AsyncStorage.getItem("@ContatosEmergencia:contacts");

    if (!users) {
      await AsyncStorage.setItem("@ContatosEmergencia:users", JSON.stringify([]));
    }

    if (!contacts) {
      await AsyncStorage.setItem("@ContatosEmergencia:contacts", JSON.stringify([]));
    }
  }

  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Routes />
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
