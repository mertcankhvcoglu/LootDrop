import React, { useState } from 'react'
import ProductList from '../components/ProductList.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import '../css/Shop.css'

function Shop() {
    // 1. Kategori bilgisini burada tutuyoruz (Başlangıçta boş dizi [])
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Başlık Mantığı: Dizi boşsa ALL, doluysa virgülle yaz (FIGURES & LIGHTING...)
    const getTitle = () => {
        if (!selectedCategories || selectedCategories.length === 0) return "ALL CATEGORIES";
        return selectedCategories.map(c => c.toUpperCase()).join(" & ");
    };

    return (
        <div className='shop-page container'>

            {/* LEFT SIDE: Kategori değiştirme yetkisini (fonksiyonu) buraya veriyoruz */}
            {/* DÜZELTME: Prop isimleri FilterSidebar.jsx ile birebir aynı olmalı */}
            <FilterSidebar
                selectedCategories={selectedCategories}
                onApplyFilters={setSelectedCategories}
            />

            {/* RIGHT SIDE */}
            <div className='shop-content'>

                {/* top-side */}
                <div className='shop-header'>

                    <h2 className='shop-title'>
                        {getTitle()} //
                    </h2>
                    <div className='sort-dropdown'>
                        Sort by: <span className='active-sort'>Relevance ↕</span>
                    </div>
                </div>

                {/* Ürün Listesine sadece "Seçili olan bu" diyoruz */}
                <ProductList
                    showHeader={false}
                    selectedCategories={selectedCategories}
                />

            </div>

        </div>
    )
}

export default Shop