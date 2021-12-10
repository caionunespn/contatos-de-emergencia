import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/theme';

const GradientHeader = ({noBack , ...props}) => {
    const {theme} = useTheme();

    return (
        <View style={styles(theme).container}>
            <LinearGradient
                colors={[theme.gradientFirstColor, theme.gradientFirstColor]}
                style={styles(theme).background}
            >
                {!noBack && (
                    <TouchableOpacity onPress={props.navigation.goBack}>
                        <Ionicons name="arrow-back" size={40} color={theme.white} />
                    </TouchableOpacity>
                )}
                <Text style={styles(theme).text}>{props.title}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
    },  
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row',
    },  
    text: {
        fontSize: 28,
        color: theme.white,
        fontWeight: 'bold',
        marginLeft: 8,
    }
});

export default GradientHeader;