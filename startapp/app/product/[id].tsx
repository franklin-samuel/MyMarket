import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Product, products } from '../../src/data/products';
import { useCart }  from '../contexts/cartContext'


export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  const [qtd, setQtd] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const [observation, setObservation] = React.useState('')

  const { addToCart } = useCart();

  const router = useRouter();

  const handleAddToCart = () => {
    const item = {
      id: realProduct.id,
      name: realProduct.name,
      price: realProduct.price,
      quantity: qtd,
      observation: observation,
      image: realProduct.image
    };

    addToCart(item);
  };

  React.useEffect(() => {
    if (product) {
      const newTotal = qtd * product.price;
      setTotal(newTotal);
    }
  }, [qtd, product]);

  React.useEffect(() => {
    setObservation('');
    setQtd(1);
  }, [product?.id]);

  const totalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Produto não encontrado 😢</Text>
      </View>
    );
  }

  const realProduct = product as Product

  return (
    
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.box}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.observation}>
            <Text style={styles.textobs}>Alguma observação?</Text>
            <TextInput
            style={styles.obs}
            placeholder='Ex: Sem embalagem, lavado, etc.'
            placeholderTextColor='#888'
            value={observation}
            onChangeText={setObservation}
            />
          </View>
        </ScrollView>
        <View style={styles.final}>
          <View style={styles.quantity}>
            <TouchableOpacity onPress={() => setQtd(qtd + 1)}>
              <Text style={styles.buttonquantity}>+</Text>
            </TouchableOpacity>
            <Text>{qtd}</Text>
            <TouchableOpacity onPress={() => setQtd(prev => Math.max(1, prev - 1))}>
              <Text style={styles.buttonquantitymenos}>-</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.boton} onPress={() => {
            handleAddToCart();
            router.back()
          }}>
            <View style={styles.direction}>
              <Text style={styles.botonText}>Adicionar</Text>
              <Text style={styles.botonText}>{totalFormatado}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1
  },

  container: {
    padding: 16,
    paddingBottom: 120,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
    borderWidth: 1
  },

  box: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'column',
    gap: 8
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  description: {
    fontSize: 16,
    color: '#666',
  },

  price: {
    fontSize: 20,
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'right',
  },

  observation: {
    width: '100%',
    gap: 6,
  },

  textobs: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4
  },

  obs: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#333'
  },

  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },

  buttonquantity: {
    fontSize: 28,
    color: '#e74c3c',
    fontWeight: 'bold'
  },

  buttonquantitymenos: {
    fontSize: 32,
    color: '#e74c3c',
    fontWeight: 'bold'
  },

  final: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  boton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 20
  },

  botonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  direction: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  notFound: {
    fontSize: 18,
    color: 'red'
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

