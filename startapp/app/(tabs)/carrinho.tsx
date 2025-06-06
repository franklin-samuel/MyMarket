import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/cartContext';
import { useRouter } from 'expo-router';

export default function ScreenCart() {
    const { cart, updateQuantity, clearCart } = useCart();

    const router = useRouter();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    function renderProduct({ item }: { item: any }) { 
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <View style={styles.nameqtd}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.quantidade}>
                            {item.quantity === 1 ? (
                                <TouchableOpacity onPress={() => updateQuantity(item.id, 0)}>
                                    <View style={styles.trashIconView}>
                                        <Image
                                            source={require('../../assets/images/lixo.png')}
                                            style={styles.trashIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Text style={styles.button}>-</Text>
                            </TouchableOpacity>
                            
                            )}
                            <Text>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Text style={styles.button}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text>{item.observation}</Text>
                    <Text style={styles.total}>Total: R$ {(item.price * item.quantity).toFixed(2)}</Text>
                    
                </View>
            </View>
        )
    }

    if (cart.length === 0) {
        return (
            <View style={styles.page}>
                <View style={styles.noone}>
                    <Text>Seu carrinho está vazio 😢</Text>
                </View>
            </View>
        )
    };

    return (
        <View style={styles.page}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                contentContainerStyle={{ paddingTop: 30, paddingBottom: 30 }}
            />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
                <TouchableOpacity style={styles.clearButton} onPress={ () => router.push('/address') }>
                    <Text style={styles.clearButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 40
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 12,
        marginHorizontal: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: 90,
        height: 90,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    price: { fontSize: 16, color: '#555', marginTop: 4 },
    total: { fontSize: 16, color: '#333', marginTop: 4, fontWeight: 'bold' },
    noone: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    quantidade: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 0,
        alignItems: 'center',
        height: '100%'
    },
    button: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 16,
        backgroundColor: '#fff'
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    nameqtd: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    trashIcon: {
        width: 25,
        height: 25,
    },

    trashIconView: {
        backgroundColor: '#fff',
        width: 26,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    }
});
