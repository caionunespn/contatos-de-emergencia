import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme } from '../../contexts/theme';

const Logo = ({size, style, ...props}) => {
    const {theme} = useTheme();

    return (
        <View style={[styles(theme, size).container, style]} {...props}>
            <View style={styles(theme, size).iconWrapper}>
                <MaterialIcons name="connect-without-contact" size={size/1.5} color={theme.gradientFirstColor} />
            </View>
            <Text style={styles(theme, size).text}>Contatos de Emergência</Text>
        </View>
    );
}

const styles = (theme, size) => StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },  
    iconWrapper: {
        width: size,
        height: size,
        borderRadius: size/2,
        backgroundColor: theme.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    text: {
        fontSize: size/3,
        color: theme.white,
        fontWeight: 'bold',
    },
});

export default Logo;