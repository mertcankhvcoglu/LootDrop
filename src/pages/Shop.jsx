import React, { useState } from 'react'
import ProductList from '../components/ProductList.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import '../css/Shop.css'
import { HiOutlineAdjustments } from 'react-icons/hi';

// searchTerm prop'u kaldırıldı
function Shop() { 
    const [selectedCategories, setSelectedCategories] = useState([]);

    const getTitle = () => {
        if (!selectedCategories || selectedCategories.length === 0) return "ALL CATEGORIES";
        return selectedCategories.map(c => c.toUpperCase()).join(" & ");
    };

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className='shop-page container'>
            {/* FilterSidebar.jsx ile birebir aynı olmalı */}
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

                {/* searchTerm prop'u kaldırıldı, sadece kategorilerle çalışıyor */}
                <ProductList
                    showHeader={false}
                    selectedCategories={selectedCategories}
                />
            </div>
        </div>
    )
}

export default Shop