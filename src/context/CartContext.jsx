import React, { createContext, useReducer, useContext, useEffect } from 'react';

// 1. Context Oluşturma (Telsiz Kanalı)
const CartContext = createContext();

// 2. Initial State (Başlangıç Durumu)
// Önce LocalStorage'a bakıyoruz, varsa oradan yüklüyoruz (Persistence)
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('lootdrop_cart')) || [],
    totalAmount: 0
};

// 3. Reducer Fonksiyonu (İş Kuralları)
// "Neden Reducer?" Çünkü state değişimlerini 'Action' bazlı yönetmek 
// hata takibini (debugging) ve mantıksal karmaşıklığı yönetmeyi kolaylaştırır.
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            );

            let updatedItems;

            if (existingItemIndex > -1) {
                // Eğer ürün zaten varsa: Adedi artır
                const updatedItem = {
                    ...state.cartItems[existingItemIndex],
                    quantity: state.cartItems[existingItemIndex].quantity + 1
                };
                updatedItems = [...state.cartItems];
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                // Eğer ürün yeniyse: Listeye ekle (Quantity: 1 ile başla)
                updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            }

            return { ...state, cartItems: updatedItems };
        }

        // --- YENİ AKSİYON: MİKTAR AZALTMA ---
        case 'DECREASE_QUANTITY': {
            const existingItemIndex = state.cartItems.findIndex(
                item => item.id === action.payload
            );

            const existingItem = state.cartItems[existingItemIndex];
            let updatedItems;

            if (existingItem.quantity === 1) {
                // Eğer son 1 tane kaldıysa ve azaltılıyorsa, ürünü listeden tamamen çıkar
                updatedItems = state.cartItems.filter(item => item.id !== action.payload);
            } else {
                // Değilse, adedi 1 düşürerek kopyasını oluştur
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1
                };
                updatedItems = [...state.cartItems];
                updatedItems[existingItemIndex] = updatedItem;
            }

            return { ...state, cartItems: updatedItems };
        }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };

        case 'CLEAR_CART':
            return { ...state, cartItems: [] };

        default:
            return state;
    }
};

// 4. Provider Bileşeni (Yayıncı)
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Her sepet değiştiğinde LocalStorage'a mühürle
    useEffect(() => {
        localStorage.setItem('lootdrop_cart', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    // Toplam tutarı hesapla
    const totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 0
    );

    return (
        <CartContext.Provider value={{
            cartItems: state.cartItems, // State'ten gelen ürünler
            totalAmount,                      // Hesaplanan tutar
            dispatch                          // Aksiyon tetikleyici (Ekle/Çıkar)
        }}>
            {children}
        </CartContext.Provider>
    );
};

// 5. Custom Hook (Tüketici - Kullanım Kolaylığı)
export const useCart = () => useContext(CartContext);