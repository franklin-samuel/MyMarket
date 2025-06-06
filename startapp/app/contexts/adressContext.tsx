import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Address = {
  id: string;
  label: string;
  details: string;
};

type AddressContextType = {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Address) => void;
  selectAddress: (id: string) => void;
  removeAddress: (id: string) => void;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const storedAddresses = await AsyncStorage.getItem('@addresses');
        
        const storedSelected = await AsyncStorage.getItem('@selectedAddress'); 

        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
        }

        if (storedSelected) {
          setSelectedAddress(JSON.parse(storedSelected));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do AsyncStorage:', error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    AsyncStorage.setItem('@selectedAddress', JSON.stringify(selectedAddress));
  }, [selectedAddress]); 

  function addAddress(address: Address) {
    setAddresses((prev) => [...prev, address]);
    setSelectedAddress(address);
  }

  function selectAddress(id: string) {
    const found = addresses.find((addr) => addr.id === id);
    setSelectedAddress(found || null);
  }

  function removeAddress(id: string) {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  }

  return (
    <AddressContext.Provider
      value={{ addresses, selectedAddress, addAddress, selectAddress, removeAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) throw new Error('useAddress deve ser usado dentro do AddressProvider');
  return context;
}
