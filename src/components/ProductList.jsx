import React, { useState, useRef, useEffect } from 'react';
import '../css/ProductList.css'
import ProductCard from './ProductCard.jsx';
// Statik veriyi kaldırdık, servisi ekledik:
import { getProducts } from '../services/ProductService.js';

const ProductList = ({ showHeader = true }) => {

    const listTopRef = useRef(null);

    // States
    const [products, setProducts] = useState([]); // Ürün listesi
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı artık backend'den gelecek
    const [loading, setLoading] = useState(true); // Yükleniyor mu?

    const itemsPerPage = 12;

    // useEffect: Sayfa numarası (currentPage) her değiştiğinde çalışır
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            // Backend 0'dan başlar (page - 1), Frontend 1'den başlar.
            // itemsPerPage bilgisini backend'e gönderiyoruz (Backend default 12 ama garanti olsun)
            const data = await getProducts(null, page - 1);

            setProducts(data.content); // Ürünleri state'e at
            setTotalPages(data.totalPages); // Toplam sayfa sayısını güncelle
        } catch (error) {
            console.error("Ürünler çekilemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        // UX Kuralı: Sayfa değişince yukarı kaydır
        if (listTopRef.current) {
            const yCoordinate = listTopRef.current.getBoundingClientRect().top + window.scrollY;
            const yOffset = -100;

            window.scrollTo({
                top: yCoordinate + yOffset,
                behavior: 'smooth'
            });
        }
    };

    // Loading Durumu
    if (loading) {
        return <div className="text-center p-10 text-white">Loading Cyberware...</div>;
    }

    return (
        <div ref={listTopRef} className={`product-list-container ${!showHeader ? 'shop-mode' : ''}`}>

            {/* Başlık Alanı */}
            {showHeader && (
                <div className="list-header">
                    <h2 className="list-title">ALL <span className="highlight">DROPS</span></h2>
                </div>
            )}

            {/* Item List */}
            <div className='products-grid'>
                {products.map((item) => (
                    // Backend'den gelen her 'item' artık 'ProductCard'a gidiyor
                    <ProductCard key={item.id} product={item}></ProductCard>
                ))}
            </div>

            {/* SERVER-SIDE PAGINATION KONTROLLERİ */}
            {totalPages > 1 && (
                <div className='pagination-container'>
                    {/* Back Button */}
                    <button
                        className='page-btn nav-btn'
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt; Prev
                    </button>

                    {/* Sayfa Numaraları */}
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => paginate(pageNum)}
                                className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {/* Next Button */}
                    <button
                        className="page-btn nav-btn"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next &gt;
                    </button>
                </div>
            )}
        </div>
    )
};

export default ProductList;