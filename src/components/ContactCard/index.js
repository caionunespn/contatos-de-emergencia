import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { useTheme } from '../../contexts/theme';

const ContactCard = ({contact, style, type = 'add', withRemove, onRemovePress, ...props}) => {
  const {theme} = useTheme();

  return (
      <View style={styles(theme, withRemove).wrapper}>
        <TouchableOpacity style={[styles(theme, withRemove).container, style]} {...props}>
            <MaterialIcons name={type === 'add' ? "person-add" : "call"} size={32} color={theme.textColor} />
            <Text style={styles(theme, withRemove).text}>{contact.name}</Text>
        </TouchableOpacity>
        {withRemove && (
            <TouchableOpacity style={styles(theme, withRemove).remove} onPress={onRemovePress}>
                <MaterialCommunityIcons name="trash-can" size={32} color={theme.textColor} />
            </TouchableOpacity>
        )}
      </View>
  );
}

const styles = (theme, withRemove) => StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
        height: 60,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: theme.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        paddingHorizontal: 16,
    },  
    container: {
        width: withRemove ? '90%' : '100%',
        height: '100%',
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: theme.textColor,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    remove: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ContactCard;