import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

const HistoryContext = createContext<HistoryContextType |  undefined>(undefined);


export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<Order[]>([]);

  const addToHistory = (order: Order) => {
    setHistory((prev) => [...prev, order]);
  }

  return (
    <HistoryContext.Provider value={{ history, addToHistory } }>
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

