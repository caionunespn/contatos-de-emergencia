import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';

const LinkButton = ({children, textStyle, style, ...props}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity style={[styles(theme).container, style]} {...props}>
      <Text style={[styles(theme).text, textStyle,]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.textMuted,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default LinkButton;