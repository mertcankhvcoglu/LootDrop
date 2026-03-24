import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/ProductService'; // Servisi içeri al
import '../css/ProductDetailPage.css';
import { MdOutlineShoppingCart, MdAdd, MdRemove } from "react-icons/md";

const ProductDetailPage = () => {
    const { id } = useParams(); // URL'deki :id değerini alır
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        else if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    if (loading) return <div className="loading-container">Veriler yükleniyor...</div>;
    if (!product) return <div className="error-container">Ürün bulunamadı.</div>;

    return (
        <div className='product-detail-page'>
            <div className='container-dp'>
                <nav className='breadcrumb'>
                    ROOT / {product.category?.name || "CATEGORY"} / <span className='active-node'>{product.name?.replace(/\s+/g, '_')}</span>
                </nav>

                <div className='detail-wrapper'>
                    <div className='product-images-section'>
                        <div className='main-image-box'>
                            <div className='scan-complete-tag'>// SCAN_COMPLETE</div>
                            {/* Backend'den gelen imageUrl kullanılır */}
                            <img src={product.imageUrl || "https://via.placeholder.com/500x600"} alt={product.name} />
                        </div>
                        {/* Küçük resimler (şimdilik statik kalabilir veya backend'e eklenebilir) */}
                    </div>

                    <div className='product-info-section'>
                        <div className='title-group'>
                            <h1 className='p-name'>{product.name}</h1>
                            <p className='p-edition'>STANDARD EDITION</p>
                        </div>

                        <div className='p-price'>
                            ${product.price?.toFixed(2)} <span className='eddies-label'>EDDIES</span>
                        </div>

                        <div className='specs-details-box'>
                            <div className='specs-header'>
                                <span className='yellow-dot'></span> SPECS_DETAILS
                            </div>
                            <p className='p-desc'>{product.description || "No description provided for this hardware."}</p>
                            
                            {/* Teknik detaylar backend'de ayrı alanlar değilse varsayılan değerler koyabiliriz */}
                            <div className='specs-list'>
                                <div className='spec-item'><span>STOCK STATUS:</span> <span>{product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK"}</span></div>
                                <div className='spec-item'><span>HARDWARE_ID:</span> <span>#000{product.id}</span></div>
                            </div>
                        </div>

                        <div className='purchase-area'>
                            <div className='qty-selector'>
                                <button onClick={() => handleQuantity('dec')}><MdRemove /></button>
                                <span>{quantity.toString().padStart(2, '0')}</span>
                                <button onClick={() => handleQuantity('inc')}><MdAdd /></button>
                            </div>
                            <button className='init-purchase-btn' disabled={product.stock <= 0}>
                                <MdOutlineShoppingCart /> {product.stock > 0 ? "INIT_PURCHASE" : "OUT_OF_STOCK"}
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