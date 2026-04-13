import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { MdDeleteOutline, MdAdd, MdRemove, MdArrowBack } from "react-icons/md";
import '../css/CartPage.css';

const CartPage = () => {
    const { cartItems, totalAmount, dispatch } = useCart();

    // Miktar artırma: Mevcut ADD_TO_CART'ı kullanıyoruz
    const handleIncrease = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    // Miktar azaltma: Yeni yazdığımız DECREASE_QUANTITY'i çağırıyoruz
    const handleDecrease = (id) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    };

    // Tamamen silme
    const handleRemove = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-cart-box">
                    <h2>// ERROR: NO_LOOT_FOUND //</h2>
                    <p>Your neural link shows 0 active items in transport.</p>
                    <Link to="/products" className="back-to-shop">
                        <MdArrowBack /> RETURN TO MARKET
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page-wrapper">
            <h1 className="page-title">CART_MANAGEMENT_<span className="highlight">PROTOCOL</span></h1>

            <div className="cart-content">
                {/* 1. Ürün Listesi */}
                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item-row">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-img" />

                            <div className="item-main-info">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-category">Hard-Drive Slot #0{item.id}</p>
                            </div>

                            <div className="qty-control-group">
                                <button className="qty-action" onClick={() => handleDecrease(item.id)}><MdRemove /></button>
                                <span className="qty-number">{item.quantity}</span>
                                <button className="qty-action" onClick={() => handleIncrease(item)}><MdAdd /></button>
                            </div>

                            <div className="item-price-calc">
                                <span className="price-label">PRICE:</span>
                                <span className="price-value">$ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>

                            <button className="remove-item-btn" onClick={() => handleRemove(item.id)}>
                                <MdDeleteOutline />
                            </button>
                        </div>
                    ))}
                </div>

                {/* 2. Sipariş Özeti (Sticky Summary) */}
                <div className="order-summary-card">
                    <h3>ORDER_SUMMARY</h3>
                    <div className="summary-details">
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>$ {totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Shipping (Drone Delivery)</span>
                            <span className="free-text">FREE</span>
                        </div>
                        <div className="summary-line">
                            <span>Tax (City Grid)</span>
                            <span>$ {(totalAmount * 0.10).toFixed(2)}</span>
                        </div>
                        <div className="summary-line total-line">
                            <span>TOTAL_CREDITS</span>
                            <span className="neon-total">$ {(totalAmount * 1.10).toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="checkout-protocol-btn">
                        EXECUTE CHECKOUT
                    </button>
                    <p className="secure-text">/ Secure transaction via Militech /</p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;