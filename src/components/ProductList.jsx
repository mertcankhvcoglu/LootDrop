import React, { useState, useRef } from 'react';
import '../css/ProductList.css'
import ProductCard from './ProductCard.jsx';
import { products } from '../data.js';



const ProductList = ({ showHeader = true }) => {


    const listTopRef = useRef(null);
    //states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12 //for 3x4 or 4x3 grid

    //mathematical calcs
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //slice this area
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Sayfa değişince kullanıcıyı sayfanın en tepesine at (UX kuralı)
        if (listTopRef.current) {
            // Elementin sayfanın en tepesine olan uzaklığını al
            const yCoordinate = listTopRef.current.getBoundingClientRect().top + window.scrollY;

            // Header'ın yüksekliğini (yaklaşık 80-100px) hesaba katarak biraz yukarıda dur
            // Böylece başlık Header'ın arkasında kalmaz.
            const yOffset = -100;

            window.scrollTo({
                top: yCoordinate + yOffset,
                behavior: 'smooth'
            });
        }
    };


    return (
        // Eğer showHead false ise 'no-padding' sınıfını ekle
        <div ref={listTopRef} className={`product-list-container ${!showHeader ? 'shop-mode' : ''}`}>

            {/* Başlık Alanı: Sadece showHead TRUE ise görünür */}
            {showHeader && (
                <div className="list-header">
                    <h2 className="list-title">ALL <span className="highlight">DROPS</span></h2>
                </div>
            )}
            {/* Item List */}
            <div className='products-grid'>
                {currentItems.map((item) => (
                    <ProductCard key={item.id} product={item}></ProductCard>
                ))}
            </div>

            {/* CLIENT-SIDE PAGINATION */}

            {totalPages > 1 && (
                <div className='pagination-container'>
                    {/* back button */}
                    <button
                        className='page-btn nav-btn'
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt; Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1; // index starts from 0 so +1
                        return (
                            <button
                                key={pageNum}
                                onClick={() => paginate(pageNum)}
                                // Eğer şu anki sayfa bu butonsa 'active' sınıfı ekle (Sarı yap)
                                className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {/* İLERİ BUTONU */}
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

export default ProductList