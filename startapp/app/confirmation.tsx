import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function confirmationScreen() {
    const router = useRouter();
    
    const handleAnimationFinish = () => {
        router.replace('/')
    }

    return (
        <View style={styles.main}>
            <LottieView
            source={require('../assets/animations/Animation - 1749587417177.json')} 
            autoPlay
            loop={false}
            onAnimationFinish={handleAnimationFinish}
            style={styles.animation}
            />
            <Text>Pedido realizado!</Text>
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