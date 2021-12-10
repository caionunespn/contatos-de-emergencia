import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Animated, Text} from 'react-native';
import { useTheme } from '../../contexts/theme';

const Snackbar = ({handleClose, information: {text, duration, withFab}}) => {
  const bottomAnimation = useRef(new Animated.Value(-200)).current;
  const [animationEnter, setAnimationEnter] = useState(false);

  useEffect(() => {
    if (!animationEnter) {
        Animated.timing(
            bottomAnimation,
            {
                toValue: withFab ? 140 : 80,
                duration: 500,
                useNativeDriver: false,
            }
        ).start(() => {
            setTimeout(() => {
                setAnimationEnter(true);
            }, 2000);
        });
    } else {
        Animated.timing(
            bottomAnimation,
            {
                toValue: -200,
                duration: 500,
                useNativeDriver: false,
            }
        ).start(() => {
            clearInterval();
            handleClose();
        });
    }
    
  }, [bottomAnimation, animationEnter]);

  return (
    <Animated.View style={[styles.container, {bottom: bottomAnimation}]}>
        <Text style={styles.text}>
            {text}
        </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -20,
        backgroundColor: '#FFF',
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text: {
        color: '#212121',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Snackbar;