import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/theme';

const Button = ({children, textStyle, style, ...props}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity style={[styles(theme).container, style]} {...props}>
      <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={[theme.gradientFirstColor, theme.gradientSecondColor]}
          style={styles(theme).background}
        >
        <Text style={[styles(theme).text, textStyle,]}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});

export default Button;