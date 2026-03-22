import React, { useState } from 'react';
import '../css/ProductDetailPage.css'; // Bu sayfa için özel CSS dosyası
// Gerekli ikonları react-icons kütüphanesinden içe aktaracağız (örneğin sepet ikonu)
import { MdOutlineShoppingCart } from "react-icons/md";

const ProductDetailPage = () => {
    // Görseldeki "Male_V" ve "Female_V" varyant seçimi için state
    const [selectedVariant, setSelectedVariant] = useState('MALE_V');
    // Adet seçimi için state
    const [quantity, setQuantity] = useState(1);

    // Örnek ürün verisi (Daha sonra backend'den gelecek)
    const product = {
        name: "V ACTION FIGURE",
        edition: "CYBERBERNK 2077 ED.",
        price: 129.99,
        currency: "EDDIES",
        description: "Premium 1/6 scale articulated figure featuring authentic likeness, tailored fabric clothing, and LED light-up functions. Includes multiple interchangeable hands and signature weaponry from Night City.",
        specs: {
            height: "30 CM",
            material: "PVC, ABS, FABRIC",
            articulation: "30+ POINTS"
        },
        images: [
            "C:\Users\meto\Desktop\Projeler\Online-Market\lootdrop\src\assets\images\Cyberpunk-2077-Art-by-J-Hill.jpg", // Görseldeki ana resim
            "C:\Users\meto\Desktop\Projeler\Online-Market\lootdrop\src\assets\images\Cyberpunk-2077-Art-by-J-Hill.jpg",     // Küçük resim 1
            "C:\Users\meto\Desktop\Projeler\Online-Market\lootdrop\src\assets\images\Cyberpunk-2077-Art-by-J-Hill.jpg",     // Küçük resim 2
            "C:\Users\meto\Desktop\Projeler\Online-Market\lootdrop\src\assets\images\Cyberpunk-2077-Art-by-J-Hill.jpg"      // Küçük resim 3
        ]
    };

    return (
        <div className="product-detail-container">
            {/* Breadcrumb Navigasyon (Sol Üst) */}
            <div className="breadcrumb">
                ROOT / FIGURES / <span className="highlight">{product.name.replace(" ", "_")}</span>
            </div>

            <div className="product-detail-content">
                {/* SOL TARAF: Resim Galerisi */}
                <div className="image-gallery">
                    <div className="main-image-container">
                        <img src={product.images[0]} alt={product.name} className="main-image" />
                        {/* Görseldeki "SCAN_COMPLETE" etiketi */}
                        <div className="scan-status">SCAN_COMPLETE</div>
                    </div>
                    <div className="thumbnail-list">
                        {product.images.slice(1).map((img, index) => (
                            <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                        ))}
                    </div>
                </div>

                {/* SAĞ TARAF: Ürün Bilgileri ve Satın Alma */}
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-edition">{product.edition}</p>
                    <div className="price-tag">
                        ${product.price.toFixed(2)} <span className="currency-label">{product.currency}</span>
                    </div>

                    {/* Teknik Özellikler Bölümü */}
                    <div className="specs-container">
                        <h3>SPECS_DETAILS</h3>
                        <p>{product.description}</p>
                        <ul>
                            <li>HEIGHT: {product.specs.height}</li>
                            <li>MATERIAL: {product.specs.material}</li>
                            <li>ARTICULATION: {product.specs.articulation}</li>
                        </ul>
                    </div>

                    {/* Varyant Seçimi */}
                    <div className="variant-selector">
                        <label>SELECT_VARIANT</label>
                        <div className="variant-buttons">
                            <button 
                                className={`variant-btn ${selectedVariant === 'MALE_V' ? 'active' : ''}`}
                                onClick={() => setSelectedVariant('MALE_V')}
                            >
                                MALE_V
                            </button>
                            <button 
                                className={`variant-btn ${selectedVariant === 'FEMALE_V' ? 'active' : ''}`}
                                onClick={() => setSelectedVariant('FEMALE_V')}
                            >
                                FEMALE_V
                            </button>
                        </div>
                    </div>

                    {/* Adet Seçimi ve Satın Alma Butonu */}
                    <div className="purchase-section">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <span>{quantity.toString().padStart(2, '0')}</span>
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                        <button className="init-purchase-btn">
                            <MdOutlineShoppingCart /> INIT_PURCHASE
                        </button>
                    </div>

                    {/* Güvenlik Protokolü Metni (Sağ Alt) */}
                    <div className="security-protocol">
                        SECURE_TRANSACTION_PROTOCOL_ACTIVE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;