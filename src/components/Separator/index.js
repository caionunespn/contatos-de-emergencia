import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';

const Separator = () => {
    const {theme} = useTheme();

    return <View style={styles(theme).container} />;
}

const styles = (theme) => StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: theme.muted,
        borderBottomWidth: 1,
        marginBottom: 8,
        marginTop: 16,
    }
});

export default Separator;