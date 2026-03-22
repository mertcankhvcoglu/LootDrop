import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProductDetailPage.css';
import { MdOutlineShoppingCart, MdAdd, MdRemove } from "react-icons/md";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = {
        name: "V ACTION FIGURE",
        edition: "CYBERPUNK 2077 ED.",
        price: 129.99,
        category: "FIGURES",
        description: "Premium 1/6 scale articulated figure featuring authentic likeness, tailored fabric clothing, and LED light-up functions. Includes multiple interchangeable hands and signature weaponry from Night City.",
        specs: {
            height: "30 CM",
            material: "PVC, ABS, FABRIC",
            articulation: "30+ POINTS"
        }
    };

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        else if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    return (
        <div className='product-detail-page'>
            <div className='container'>
                <nav className='breadcrumb'>
                    ROOT / {product.category} / <span className='active-node'>{product.name.replace(/\s+/g, '_')}</span>
                </nav>

                <div className='detail-wrapper'>
                    <div className='product-images-section'>
                        <div className='main-image-box'>
                            <div className='scan-complete-tag'>// SCAN_COMPLETE</div>
                            <img src="https://via.placeholder.com/500x600" alt="V" />
                        </div>
                        <div className='thumbnail-row'>
                            <div className='thumb active'><img src="https://via.placeholder.com/100" alt="t1" /></div>
                            <div className='thumb'><img src="https://via.placeholder.com/100" alt="t2" /></div>
                            <div className='thumb'><img src="https://via.placeholder.com/100" alt="t3" /></div>
                        </div>
                    </div>

                    <div className='product-info-section'>
                        <div className='title-group'>
                            <h1 className='p-name'>{product.name}</h1>
                            <p className='p-edition'>{product.edition}</p>
                        </div>

                        <div className='p-price'>
                            ${product.price.toFixed(2)} <span className='eddies-label'>EDDIES</span>
                        </div>

                        <div className='specs-details-box'>
                            <div className='specs-header'>
                                <span className='yellow-dot'></span> SPECS_DETAILS
                            </div>
                            <p className='p-desc'>{product.description}</p>
                            <div className='specs-list'>
                                <div className='spec-item'><span>HEIGHT:</span> <span>{product.specs.height}</span></div>
                                <div className='spec-item'><span>MATERIAL:</span> <span>{product.specs.material}</span></div>
                                <div className='spec-item'><span>ARTICULATION:</span> <span>{product.specs.articulation}</span></div>
                            </div>
                        </div>

                        <div className='purchase-area'>
                            <div className='qty-selector'>
                                <button onClick={() => handleQuantity('dec')}><MdRemove /></button>
                                <span>{quantity.toString().padStart(2, '0')}</span>
                                <button onClick={() => handleQuantity('inc')}><MdAdd /></button>
                            </div>
                            <button className='init-purchase-btn'>
                                <MdOutlineShoppingCart /> INIT_PURCHASE
                            </button>
                        </div>

                        <div className='secure-protocol'>
                            <span className='blue-check'>✔</span> SECURE_TRANSACTION_PROTOCOL_ACTIVE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;