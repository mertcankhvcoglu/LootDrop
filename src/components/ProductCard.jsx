import React from 'react'
import '../css/ProductCard.css';
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    if (!product) return <div>Loading...</div>;

    return (
        <div className='product-card'>
            {/* Image  */}
            
<Link to={`/product/${product.id}`} className='card-link'>
                <div className='image-container'>
                    <img className='card-image'
                        alt={product.name}
                        src={product.imageUrl}
                    />
                </div>
            </Link>

            <div className='card-info'>
                <Link to={`/product/${product.id}`} className='card-link'>
                    <h3 className='card-title'>{product.name}</h3>
                </Link>

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