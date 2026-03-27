import React, { useState } from 'react'
import ProductList from '../components/ProductList.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import '../css/Shop.css'
import { HiOutlineAdjustments } from 'react-icons/hi';

// 1. App.jsx'ten gelen searchTerm prop'unu karşılıyoruz
function Shop({ searchTerm }) { 
    const [selectedCategories, setSelectedCategories] = useState([]);

    const getTitle = () => {
        if (!selectedCategories || selectedCategories.length === 0) return "ALL CATEGORIES";
        return selectedCategories.map(c => c.toUpperCase()).join(" & ");
    };

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className='shop-page container'>
            <FilterSidebar
                selectedCategories={selectedCategories}
                onApplyFilters={(cats) => {
                    setSelectedCategories(cats);
                    setIsMobileFilterOpen(false);
                }}
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
            />

            <div className='shop-content'>
                <div className='shop-header'>
                    <h2 className='shop-title'>
                        {getTitle()} //
                    </h2>

                    <div className="header-controls">
                        <button
                            className="mobile-filter-toggle"
                            onClick={() => setIsMobileFilterOpen(true)}
                        >
                            <HiOutlineAdjustments /> FILTERS
                        </button>

                        <div className='sort-dropdown'>
                            Sort: <span className='active-sort'>Relevance ↕</span>
                        </div>
                    </div>
                </div>

                {/* 2. searchTerm'ü ProductList'e aktarıyoruz */}
                <ProductList
                    showHeader={false}
                    selectedCategories={selectedCategories}
                    searchTerm={searchTerm} 
                />
            </div>
        </div>
    )
}

export default Shop