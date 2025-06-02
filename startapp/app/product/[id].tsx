import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '@/data/products';


export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  const [qtd, setQtd] = React.useState(1);
  const [total, setTotal] = React.useState(0); 

  React.useEffect(() => {
    if (product) {
        const newTotal = qtd * product.price;
        setTotal(newTotal);
    }
  }, [qtd, product])

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Produto não encontrado 😢</Text>
      </View>
    );
  }

  return (
    
    
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.box}>
          <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
          </View>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      </View>
        <View>
            <Text>Quantidade</Text> 
            <TouchableOpacity onPress={() => setQtd(qtd +1)}>
                <Text>+</Text>
            </TouchableOpacity>
            <Text>{qtd}</Text>
            <TouchableOpacity onPress={() => setQtd(prev => Math.max(1, prev - 1))}>
                <Text>-</Text>
            </TouchableOpacity>  
            
        </View>  
        <TouchableOpacity style={styles.boton} onPress={() => alert('Produto adicionado ao carrinho!')}>
            <Text style={styles.botonText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    height: '100%',
  },
  image: {
    width: '90%',
    height: '50%',
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    borderWidth: 1,
  },
  price: {
    fontSize: 20,
    color: '#666',
    marginBottom: 12,
    borderWidth: 1,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    borderWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notFound: {
    fontSize: 18,
    color: 'red',
    borderWidth: 1,
  },
    box: {
        width: '90%',
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    boton: {
        width: '90%',
        height: 'auto',
        borderRadius: 0,
        backgroundColor: '#28a745',
        marginTop: 16,
    },
  botonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 12,
    fontWeight: 'bold',
  },

});