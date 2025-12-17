import React, { useEffect, useState } from 'react'
import '../css/FilterSidebar.css'

// Backend'deki isimlerle aynı olmalı
const CATEGORIES = ["Figures", "Keycaps", "Lighting", "Accessories"];

// Props olarak state'i ve değiştirme fonksiyonunu alıyoruz
// ÖNEMLİ DÜZELTME: selectedCategories undefined gelirse, varsayılan olarak boş dizi [] kullan.
const FilterSidebar = ({ selectedCategories = [], onApplyFilters }) => {

    // GEÇİCİ STATE: Kullanıcı butonları tıklarken burada tutuyoruz.
    // Başlangıç değeri olarak parent'tan gelen gerçek seçimi (veya boş diziyi) alıyoruz.
    const [tempSelected, setTempSelected] = useState(selectedCategories || []);

    // Parent'taki seçim dışarıdan değişirse (örn: menüden resetlenirse) burayı da güncelle
    // Her ihtimale karşı null/undefined gelirse boş diziye eşitle.
    useEffect(() => {
        setTempSelected(selectedCategories || []);
    }, [selectedCategories]);

    const handleCheckboxChange = (category) => {
        // Güvenlik Önlemi: tempSelected'ın kesinlikle bir dizi olduğundan emin olalım
        const currentSelected = tempSelected || [];

        if (currentSelected.includes(category)) {
            // Varsa çıkar (Filtrele)
            setTempSelected(currentSelected.filter(c => c !== category));
        } else {
            // Yoksa ekle
            setTempSelected([...currentSelected, category]);
        }
    };

    // APPLY BUTONUNA BASINCA
    const handleApplyClick = () => {
        // Ana sayfadaki (Shop.jsx) state'i güncelle
        onApplyFilters(tempSelected);
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
                                    // Artık tempSelected boş dizi olarak başladığı için .includes hatası vermez
                                    checked={tempSelected.includes(cat)}
                                    onChange={() => handleCheckboxChange(cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

            </div>

            <button className='apply-btn' onClick={handleApplyClick}>
                Apply Filters
            </button>
        </aside>
    )
}

export default FilterSidebar