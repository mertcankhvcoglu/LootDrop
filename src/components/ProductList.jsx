import React, { useState, useRef, useEffect } from 'react';
import '../css/ProductList.css'
import ProductCard from './ProductCard.jsx';
import { getProducts } from '../services/ProductService.js';

// selectedCategory prop'unu karşıla
const ProductList = ({ showHeader = true, selectedCategory }) => {

    const listTopRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    // Kategori değiştiğinde sayfayı 1'e sıfırla
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    // Sayfa veya Kategori değişince veri çek
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, selectedCategory]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            // Prop olarak gelen selectedCategory'i kullan
            const data = await getProducts(selectedCategory, page - 1);
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Hata:", error);
        } finally {
            setLoading(false);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (listTopRef.current) {
            // Scroll ayarını Shop sayfasının yapısına göre biraz daha yukarı çektim
            const yCoordinate = listTopRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: yCoordinate - 150, behavior: 'smooth' });
        }
    };

    if (loading) return <div className="text-white text-center p-10">Loading Cyberware...</div>;

    return (
        <div ref={listTopRef} className={`product-list-container ${!showHeader ? 'shop-mode' : ''}`}>

            {showHeader && (
                <div className="list-header">
                    <h2 className="list-title">
                        {selectedCategory ? selectedCategory.toUpperCase() : "ALL"} <span className="highlight">DROPS</span>
                    </h2>
                </div>
            )}

            {/* Ürün Listesi */}
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='pagination-container'>
                    <button
                        className='page-btn nav-btn'
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt; Prev
                    </button>

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