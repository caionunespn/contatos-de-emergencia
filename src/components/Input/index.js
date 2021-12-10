import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme } from '../../contexts/theme';

const Input = ({style, icon, iconPosition, ...props}) => {
  const {theme} = useTheme();

  return (
    <View style={{position: 'relative'}}>
    {iconPosition === 'left' && (
      <MaterialIcons style={[styles(theme).icon, styles(theme).leftIcon]} name={icon} size={24} color={theme.muted} />
    )}
    <TextInput 
      style={[styles(theme).container, style,]}
      {...props}
    />
    {iconPosition === 'right' && (
      <MaterialIcons style={[styles(theme).icon, styles(theme).rightIcon]} name={icon} size={24} color={theme.muted} />
    )}
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    color: theme.textColor,
    fontSize: 20,
    borderWidth: 1,
    borderColor: theme.muted,
    borderRadius: 16,
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
  },  
  icon: {
    position: 'absolute',
  },
  leftIcon: {
    
  },
  rightIcon: {
    right: 16,
    top: '20%',
  },
})

export default Input;