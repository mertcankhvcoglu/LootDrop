import React, { useState, useRef, useEffect } from 'react';
import '../css/ProductList.css'
import ProductCard from './ProductCard.jsx';
import { getProducts } from '../services/ProductService.js';

// DİKKAT: Prop ismi 'selectedCategories' (Çoğul) oldu
const ProductList = ({ showHeader = true, selectedCategories }) => {

    const listTopRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    // Kategori değiştiğinde sayfayı 1 yap
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories]);

    // Veri çekme isteği
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, selectedCategories]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            // Dizi halindeki kategorileri gönderiyoruz
            const data = await getProducts(selectedCategories, page - 1);
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Hata:", error);
        } finally {
            setLoading(false);
        }
    };

    // ... Kalan kısımlar (Paginate fonksiyonu, Render kısmı) AYNI kalıyor ...
    // ... Sadece return içindeki kodları koru, üstteki useEffect ve fetchProducts'ı güncellemen yeterli ...

    // (Kodun devamını öncekiyle aynı tutabilirsin, sadece pagination ve return kısmı)

    // paginate fonksiyonu buraya...
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (listTopRef.current) {
            const yCoordinate = listTopRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: yCoordinate - 150, behavior: 'smooth' });
        }
    };

    if (loading) return <div className="loading-text">\\ Loading Cyberware //</div>; // nvm

    return (
        <div ref={listTopRef} className={`product-list-container ${!showHeader ? 'shop-mode' : ''}`}>
            {showHeader && (
                <div className="list-header">
                    <h2 className="list-title">
                        ALL <span className="highlight">DROPS</span>
                    </h2>
                </div>
            )}

            <div className='products-grid'>
                {products.length > 0 ? (
                    products.map((item) => (
                        <ProductCard key={item.id} product={item}></ProductCard>
                    ))
                ) : (
                    <div className="text-white col-span-3 text-center py-10">
                        No products found in this sector.
                    </div>
                )}
            </div>

            {/* Pagination kodları aynı... */}
            {totalPages > 1 && (
                <div className='pagination-container'>

                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='page-btn nav-btn'>&lt; Prev</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}>{index + 1}</button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="page-btn nav-btn">Next &gt;</button>
                </div>
            )}
        </div>
    )
};

export default ProductList;