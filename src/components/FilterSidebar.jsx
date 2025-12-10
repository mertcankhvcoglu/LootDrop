import React from 'react'
import '../css/FilterSidebar.css'

// Backend'deki isimlerle aynı olmalı
const CATEGORIES = ["Figures", "Keycaps", "Lighting", "Accessories"];

// Props olarak state'i ve değiştirme fonksiyonunu alıyoruz
const FilterSidebar = ({ selectedCategory, onSelectCategory }) => {

    const handleCheckboxChange = (category) => {
        // Eğer zaten seçili olana tıklarsa seçimi kaldır (null yap), yoksa yeni kategoriyi seç
        if (selectedCategory === category) {
            onSelectCategory(null);
        } else {
            onSelectCategory(category);
        }
    };

    return (
        <aside className='filter-sidebar'>

            <div className='filter-header'>
                <h3>FILTERS //</h3>
                <p>Refine search protocols</p>
            </div>

            <div className='filter-group'>
                <div className='filter-title'>
                    <span>Price Range</span>
                    <span>^</span>
                </div>
                {/* Slider şimdilik görsel */}
                <div className='slider'>
                    <input type='range' min="0" max="2500" className='slider' />
                </div>

                <div className='checkbox-group'>
                    <div className='filter-title'>
                        <span>Category</span>
                        <span>^</span>
                    </div>

                    <div className='checkbox-group'>
                        {/* Kategorileri döngüyle oluşturuyoruz */}
                        {CATEGORIES.map((cat) => (
                            <label key={cat} className='checkbox-item'>
                                <input
                                    type='checkbox'
                                    checked={selectedCategory === cat}
                                    onChange={() => handleCheckboxChange(cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

            </div>

            <button className='apply-btn'>Apply Filters</button>
        </aside>
    )
}

export default FilterSidebar