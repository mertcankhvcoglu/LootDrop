import React from 'react'
import '../css/ProductCard.css';
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
// 1. "Bean'imizi" (Context) enjekte etmek için hook'u çağırıyoruz
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
    // 2. Telsiz kanalına bağlanıyoruz ve sadece 'dispatch' fonksiyonunu çekiyoruz
    const { dispatch } = useCart();

    if (!product) return <div>Loading...</div>;

    // 3. Buton için handler fonksiyonu (Mühendislik Protokolü)
    const handleAddToCart = () => {
        // Reducer'a "Emir" (Action) gönderiyoruz
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        });

        // Küçük bir kullanıcı geribildirimi (Opsiyonel: Console log veya Toast eklenebilir)
        console.log(`${product.name} sisteme yüklendi.`);
    };

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
                    <span className='card-price'>$ {Number(product.price).toFixed(2)}</span>
                    {/* 4. Butonu handler'a bağlıyoruz */}
                    <button
                        className='add-btn'
                        onClick={handleAddToCart}
                        title="Add to Neural Link"
                    >
                        <MdAddShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard