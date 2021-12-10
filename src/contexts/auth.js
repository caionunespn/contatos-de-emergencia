import React, { createContext, useContext, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSnackbar} from './snackbar';

import * as auth from '../services/auth';

const AuthContext = createContext({
    signed: null,
    user: null,
    signIn: null,
    signUp: null,
    update: null,
    signOut: null,
});

const AuthProvider = ({ children }) => {
  const {createSnackbar} = useSnackbar();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@ContatosEmergencia:user");
      const parsedUser = JSON.parse(storagedUser);

      if (parsedUser) {
        if (!parsedUser.keepLogin) {
          signOut();
        } else {
          setUser();
        }
      }
	    
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(payload) {
    try {
      const response = await auth.signIn(payload);
      setUser(response);
  
      await AsyncStorage.setItem("@ContatosEmergencia:user", JSON.stringify(response));
    } catch (err) {
      return createSnackbar({
        text: err.message
      });
    }
  }

  async function update(payload) {
    try {
      const response = await auth.update(user.id, payload);
      setUser(response);
  
      await AsyncStorage.setItem("@ContatosEmergencia:user", JSON.stringify(response));
      return createSnackbar({
        text: 'Informações salvas com sucesso'
      });
    } catch (err) {
      return createSnackbar({
        text: err.message
      });
    }
  }

  async function signUp(payload) {
    try {
      const response = await auth.signUp(payload);
      setUser(response);
  
      await AsyncStorage.setItem("@ContatosEmergencia:user", JSON.stringify(response));
    } catch (err) {
      return createSnackbar({
        text: err.message
      });
    }
  }

  async function signOut() {
    await AsyncStorage.setItem("@ContatosEmergencia:user", "");
    setUser(null);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, update, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider.');
    }
  
    return context;
}
  
export {AuthProvider, useAuth};