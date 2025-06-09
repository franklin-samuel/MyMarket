import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useCart } from './cartContext';
import { useAddress } from './adressContext';
import { useHistory } from './historyContext';

type PaymentMethod = 'Pix' | 'Dinheiro' | 'Cartão';
type DeliveryType = 'Entrega' | 'Retirada';

type OrderInProgress = {
    deliveryType: DeliveryType | null;
    paymentMethod: PaymentMethod | null;
};

type OrderContextType = {
    order: OrderInProgress;
    setDeliveryType: (type: DeliveryType) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    confirmOrder: () => void;
    clearOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({children}: { children: ReactNode }) => {
    const { cart, clearCart } = useCart();
    const { selectedAddress } = useAddress();
    const { addToHistory } = useHistory();

    const [ order, setOrder ] = useState<OrderInProgress> ({
        deliveryType: null,
        paymentMethod: null,
    });

    const setDeliveryType = (type: DeliveryType) => {
        setOrder((prev) => ({ ...prev, deliveryType: type }));
    };

    const setPaymentMethod = (method: PaymentMethod) => {
        setOrder((prev) => ({ ...prev, paymentMethod: method }))
    };

    const clearOrder = () => {
    setOrder({
      deliveryType: null,   
      paymentMethod: null,
    });
  };

    const confirmOrder = () => {
        if (!order.deliveryType || !order.paymentMethod) {
            throw new Error('Selecione tipo de entrega e forma de pagamento')
        }

        if (!selectedAddress && order.deliveryType === 'Entrega') {
            throw new Error('Endereço deve estar selecionado para entrega')
        }

        if (cart.length === 0) {
            throw new Error('Carrinho está vazio');
        }

        const newOrder = {
        id: String(Date.now()),
        products: cart,
        address: order.deliveryType === 'Entrega' ? selectedAddress!.details : 'Retirada no local',
        date: new Date().toISOString(),
        deliveryType: order.deliveryType,
        paymentMethod: order.paymentMethod
    };

        addToHistory(newOrder);
        clearCart();
        clearOrder();

        
    }
    return (
        <OrderContext.Provider value={{ order, setDeliveryType, setPaymentMethod, confirmOrder,     clearOrder }}>
            {children}
        </OrderContext.Provider>
    )
    

};

export const useOrder = () => {
    const context =useContext(OrderContext);
    if(!context) {
        throw new Error('useOrder deve ser usado dentro  de OrderProvider')
    }
    return context;
}


