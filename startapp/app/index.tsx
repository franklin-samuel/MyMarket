import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { products, Product } from '../src/data/products';
import { useRouter } from 'expo-router';
import { useCart } from './contexts/cartContext';

export default function HomeScreen() {
  const router = useRouter();
  const {cart} = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function renderProduct({ item }: { item: Product }) {
    return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({
            pathname: `/product/[id]`,
            params: { id: item.id }
          })}
          activeOpacity={0.7}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />

      {cart.length > 0 && (
        <TouchableOpacity
        style={styles.gotocart}
        onPress={() => router.push('/carrinho')}
        activeOpacity={0.8}>
          <View style={styles.iconandtext}>
            <Image
              source={require('../assets/images/carticon.png')}
              style={[styles.iconCart]}
            />
            <Text style={styles.gotocartText}>Carrinho</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totaltext}>R$ {total.toFixed(2)}</Text>
          </View>
          
        </TouchableOpacity>
      )}
      
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,

  },

  gotocart: {
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: '#CCC',
    borderTopWidth: 1
  },

  iconandtext: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  gotocartText: {

  },

  iconCart: {
    width: 30,
    height: 30,
    
  },

  total: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '70%',
  },

  totaltext: {
    marginRight: 25,
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold'
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
  description: { fontSize: 14, color: '#888', marginTop: 6 },
});
