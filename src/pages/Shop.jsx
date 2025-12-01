import React from 'react'
import ProductList from '../components/ProductList.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import '../css/Shop.css'

function Shop() {
    return (

        <div className='shop-page container'>

            {/* LEFT SIDE */}
            <FilterSidebar />

            {/* RIGHT SIDE */}
            <div className='shop-content'>

                {/* top-side -- header & sort by */}
                <div className='shop-header'>
                    <h2 className='shop-title'>ALL CATEGORIES //</h2>
                    <div className='sort-dropdown'>
                        Sort by: <span className='active-sort'>Relevance ↕</span>
                    </div>
                </div>

                <ProductList showHeader={false} />

            </div>

        </div>
    )
}

export default Shop