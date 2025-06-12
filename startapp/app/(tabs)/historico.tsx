import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import { useHistory } from '@/contexts/historyContext';

const primaryColor = '#ec364d';

export default function HistoricoScreen() {
  const { history, clearHistory } = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const RenderItem = ({ item }: { item: any }) => {
    const total = item.products.reduce(
      (sum: number, p: any) => sum + p.price * p.quantity,
      0
    );

    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.orderCard}>
        <Text style={styles.orderDate}>
          Pedido em: {formattedDate} às {formattedTime}
        </Text>
        <Text style={styles.orderAddress}>Endereço: {item.address}</Text>
        {item.observations ? (
          <Text style={styles.orderObs}>Obs: {item.observations}</Text>
        ) : null}

        {item.products.map((product: any, index: number) => (
          <Text key={index} style={styles.productItem}>
            • {product.name} (x{product.quantity})
          </Text>
        ))}

        <Text style={styles.orderTotal}>
          Total: R$ {total.toFixed(2).replace('.', ',')}
        </Text>
      </View>
    );
  };

  const handleConfirmDelete = () => {
    clearHistory();
    setModalVisible(false);
  };

  const renderDeleteModal = () => (
    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Excluir histórico</Text>
          <Text style={styles.modalText}>
            Deseja excluir todo o histórico de pedidos?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, { backgroundColor: primaryColor }]}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.modalButtonText}>Sim</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.h1}>Pedidos</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/images/lixo.png')}
            style={styles.trashIcon}
          />
        </TouchableOpacity>
      </View>

      {history.length === 0 ? (
        <Text style={styles.get}>Você não fez nenhum pedido ainda.</Text>
      ) : (
        <FlatList
          data={[...history].reverse()} // <- mostra os mais recentes primeiro
          keyExtractor={(item) => item.id}
          renderItem={RenderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}

      {renderDeleteModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%'
  },

  header: {
    alignItems: 'center',
    marginTop: 60,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20
  },

  h1: {
    fontWeight: 'bold',
    fontSize: 28
  },

  trashIcon: {
    height: 28,
    width: 28,
    tintColor: primaryColor
  },

  get: {
    alignSelf: 'center',
    marginTop: 300,
    color: '#ccc',
    fontStyle: 'italic'
  },

  orderCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3
  },

  orderDate: {
    fontWeight: 'bold',
    marginBottom: 4
  },

  orderAddress: {
    marginBottom: 4
  },

  orderObs: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 4
  },

  productItem: {
    marginLeft: 10,
    color: '#555',
    fontSize: 14
  },

  orderTotal: {
    fontWeight: 'bold',
    color: primaryColor,
    marginTop: 8
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center'
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  modalText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center'
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5
  },

  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
