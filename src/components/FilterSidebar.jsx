import React from 'react'
import '../css/FilterSidebar.css'


const FilterSidebar = () => {
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
                {/* Slider */}
                <div className='slider'>
                    <input type='range' min="0" max="2500" className='slider' />
                    <div className='price-values'>
                        <span>$50</span>
                        <span>$850</span>
                    </div>
                </div>

                <div className='checkbox-group'>
                    <div className='filter-title'>
                        <span>Category</span>
                        <span>^</span>
                    </div>
                    <div className='checkbox-group'>
                        <label className='checkbox-item'>
                            <input type='checkbox' />Figures
                        </label>
                        <label className='checkbox-item'>
                            <input type='checkbox' />Keycaps
                        </label>
                        <label className='checkbox-item'>
                            <input type='checkbox' />Lighting
                        </label>
                        <label className='checkbox-item'>
                            <input type='checkbox' />Accessories
                        </label>
                    </div>
                </div>

            </div>

            <button className='apply-btn'>Apply Filters</button>
        </aside>
    )
}

export default FilterSidebar