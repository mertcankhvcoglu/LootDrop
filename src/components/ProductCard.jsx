import React from 'react'
import '../css/ProductCard.css';
import { MdAddShoppingCart } from "react-icons/md";

const ProductCard = ({ product }) => {

    if (!product) return <div>Loading...</div>;

    return (
        <div className='product-card'>
            {/* Image  */}
            <div className='image-container'>
                <img className='card-image'
                    alt={product.name}
                    // DEĞİŞİKLİK BURADA: 'image' yerine 'imageUrl' kullanıyoruz (Backend'den gelen isim)
                    src={product.imageUrl}
                />
            </div>

            <div className='card-info'>
                <h3 className='card-title'>{product.name}</h3>

                <div className='card-footer'>
                    {/* Fiyatın number veya string gelme ihtimaline karşı güvenli gösterim */}
                    <span className='card-price'>$ {Number(product.price).toFixed(2)}</span>
                    <button className='add-btn'><MdAddShoppingCart /></button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard