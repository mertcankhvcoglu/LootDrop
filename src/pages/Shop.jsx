import React, { useState } from 'react'
import ProductList from '../components/ProductList.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import '../css/Shop.css'

function Shop() {
    // 1. Kategori bilgisini burada tutuyoruz (Varsayılan: null yani Hepsi)
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className='shop-page container'>

            {/* LEFT SIDE: Kategori değiştirme yetkisini (fonksiyonu) buraya veriyoruz */}
            <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* RIGHT SIDE */}
            <div className='shop-content'>

                {/* top-side */}
                <div className='shop-header'>
                    {/* Başlık artık dinamik! */}
                    <h2 className='shop-title'>
                        {selectedCategory ? selectedCategory.toUpperCase() : "ALL CATEGORIES"} //
                    </h2>
                    <div className='sort-dropdown'>
                        Sort by: <span className='active-sort'>Relevance ↕</span>
                    </div>
                </div>

                {/* Ürün Listesine sadece "Seçili olan bu" diyoruz */}
                <ProductList
                    showHeader={false}
                    selectedCategory={selectedCategory}
                />

            </div>

        </div>
    )
}

export default Shop