import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'

export default function confirmationScreen() {
    return (
        <View style={styles.main}>
            <LottieView
            source={require('../assets/animations/Animation - 1749587417177.json')} 
            autoPlay
            loop
            style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    animation: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})