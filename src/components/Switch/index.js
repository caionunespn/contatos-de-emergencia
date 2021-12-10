import React from 'react';
import { View, Switch as RNSwitch, Text, StyleSheet } from 'react-native';
import {useTheme} from '../../contexts/theme';

const Switch = ({value, onChangeValue, children, ...props}) => {
  const {theme} = useTheme();

  return (
    <View style={styles(theme).container}>
        <Text style={styles(theme).text}>{children}</Text>
        <RNSwitch 
            trackColor={{ false: theme.muted, true: theme.gradientSecondColor }}
            thumbColor={theme.gradientFirstColor}
            ios_backgroundColor={theme.gradientFirstColor}
            onValueChange={() => onChangeValue(!value)}
            value={value}
            {...props}
        />
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingLeft: 8,
    },
    text: {
        fontSize: 18,
        color: theme.textColor,
    }
});

export default Switch;