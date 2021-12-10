import React, {useState, useEffect, useCallback} from 'react';
import { Platform, Text, StyleSheet, ScrollView, Linking, RefreshControl, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/theme';
import { useSnackbar } from '../../contexts/snackbar';
import { useAuth } from '../../contexts/auth';
import ContactCard from '../../components/ContactCard';
import {getContacts, removeContact} from '../../services/contacts';

const Contacts = ({navigation}) => {
  const {theme} = useTheme();
  const {user} = useAuth();
  const {createSnackbar} = useSnackbar();

  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyContacts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getMyContacts();

    setRefreshing(false);
  }, []);

  const getMyContacts = async () => {
    try {
      const myContacts = await getContacts(user.id);
      if (myContacts.length > 0) {
        setContacts(myContacts);
      } else {
        setContacts([]);
      }
    } catch (err) {
      return createSnackbar({
        text: err.message,
      });
    }
  }

  const handleCall = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else  {
      phoneNumber = `tel:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        return createSnackbar({
          text: 'Número de telefone inválido',
        });
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => createSnackbar({
      text: err.message,
    }));
  }

  const handleRemove = (contact) => {
    Alert.alert(
      "Remover contato",
      `Tem certeza que deseja remover ${contact.name}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Remover", onPress: async () => {
          try {
            await removeContact(user.id, contact.id);
            onRefresh();
            return createSnackbar({
              text: 'Contato removido com sucesso',
            });
          } catch (err) {
            return createSnackbar({
              text: err.message,
            })
          }
        } }
      ]
    );
  }

  return (
      <LinearGradient
        colors={[theme.gradientFirstColor, theme.gradientSecondColor]}
        style={styles(theme).background}
      >
        <Text style={styles(theme).subtitle}>Clique num contato para ligar</Text>
        <ScrollView 
          contentContainerStyle={styles(theme).container} 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {contacts.map(contact => (
            <ContactCard 
              key={contact.id}
              type="contact"
              contact={contact}
              onPress={() => handleCall(contact.phone)}
              withRemove
              onRemovePress={() => handleRemove(contact)}
            />
          ))}
        </ScrollView>
      </LinearGradient>
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

export default Contacts;