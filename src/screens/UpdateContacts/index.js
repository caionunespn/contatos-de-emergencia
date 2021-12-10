import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Contacts from 'expo-contacts';
import Input from '../../components/Input';
import { useTheme } from '../../contexts/theme';
import { useSnackbar } from '../../contexts/snackbar';
import { useAuth } from '../../contexts/auth';
import ContactCard from '../../components/ContactCard';
import {createContact} from '../../services/contacts';

const UpdateContacts = ({navigation}) => {
  const {theme} = useTheme();
  const {user} = useAuth();
  const {createSnackbar} = useSnackbar();

  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 0) {
        getContacts(search);
      } else {
        setContacts([]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn)
  }, [search]);

  const getContacts = async (name) => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const filteredContacts = []; 
        
        for (const contact of data) {
          if (contact.name && contact.name.includes(name)) {
            filteredContacts.push({
              id: contact.id,
              name: contact.name,
              phone: contact.phoneNumbers[0].number
            });
          }
        }

        setContacts(filteredContacts);
      }
    }
  }

  const handleAddContact = (contact) => {
    Alert.alert(
      "Adicionar contato",
      `Tem certeza que deseja adicionar ${contact.name}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Adicionar", onPress: async () => {
          try {
            await createContact(user.id, contact);
            return createSnackbar({
              text: 'Contato criado com sucesso',
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
        <Text style={styles(theme).subtitle}>Pesquise um contato da sua lista e clique para adicioná-lo</Text>
        <ScrollView contentContainerStyle={styles(theme).container}>
          <Input
            icon="search"
            iconPosition="right"
            placeholder="Buscar"
            value={search}
            onChangeText={text => setSearch(text)}
          />
          {contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} onPress={() => handleAddContact(contact)} />
          ))}
        </ScrollView>
      </LinearGradient>
  );
}

const styles = (theme = null) => StyleSheet.create({
  container: {
    width: '100%',
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

export default UpdateContacts;