import React, { useState, useEffect } from 'react';
import '../css/ProductList.css'
import ProductCard from './ProductCard.jsx';
import { products } from '../data.js';

const ProductList = () => {
    return (
        <div className='product-list'>

            {/* Item List */}
            <div className='products-grid'>
                {products.map((item) => (
                    <ProductCard key={item.id} product={item}></ProductCard>
                ))}
            </div>

        </div>
    )


};

export default ProductList