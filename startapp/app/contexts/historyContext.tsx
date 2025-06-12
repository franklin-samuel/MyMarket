import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
    id: string,
    name: string, 
    price: number,
    quantity: number,
    image: string
}

type Order = {
    id: string,
    products: Product[],
    address: string,
    observations?: string,
    date: string
}

type HistoryContextType = {
    history: Order[],
    addToHistory: (order: Order) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType |  undefined>(undefined);


export const HistoryProvider = ({ children }: { children: ReactNode }) => {

  const [history, setHistory] = useState<Order[]>([]);

  useEffect(() => {
    const historyLoad = async () => {
      const stored = await AsyncStorage.getItem('orderHistory')
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    }

    historyLoad();
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('orderHistory', JSON.stringify(history))
  }, [])


  const addToHistory = (order: Order) => {
    setHistory((prev) => [...prev, order]);
  }

  const clearHistory = () => {
    setHistory([]);
    AsyncStorage.removeItem('orderHistory')
  }

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory } }>
        {children}
    </HistoryContext.Provider>
  )
}

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory deve ser usado apenas dentro de um HistoryProvider!')
    }
    return context;
}

