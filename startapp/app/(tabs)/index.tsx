import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { products, Product } from '../../src/data/products';
import { useRouter } from 'expo-router';
import { useCart } from '../contexts/cartContext';

export default function HomeScreen() {
  const router = useRouter();
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function renderProduct({ item }: { item: Product }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: `/product/[id]`,
            params: { id: item.id },
          })
        }
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.image} />
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
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/heder.png')}
          style={styles.headerImage}
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.gotocart}
          onPress={() => router.push('/(tabs)/carrinho')}
          activeOpacity={0.8}
        >
          <View style={styles.iconandtext}>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
            <Image
              source={require('../../assets/images/carticon.png')}
              style={styles.iconCart}
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

  header: {
    backgroundColor: '#ec364d',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 100,
  },
  headerImage: {
    width: 120,
    maxHeight: 40,
    marginTop: 30,
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
  description: { fontSize: 14, color: '#888', marginTop: 6 },

  gotocart: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 60,
    backgroundColor: '#ec364d',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#ec364d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  iconandtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  cartBadgeText: {
    fontWeight: '700',
    color: '#ec364d',
    fontSize: 14,
  },
  gotocartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  iconCart: {
    width: 28,
    height: 28,
    tintColor: '#fff',
    marginRight: 12,
  },
  total: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '35%',
  },
  totaltext: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
