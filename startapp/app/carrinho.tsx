import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useCart } from './contexts/cartContext';


export default function ScreenCart() {
    const { cart, clearCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return(
            <View style={styles.page}>
                <View style={styles.noone}>
                    <Text>Seu carrinho está vazio 😢</Text>
                </View>
            </View>

        )
    }


}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        flex: 1
    },

    noone: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
});