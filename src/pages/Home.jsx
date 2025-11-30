import React from 'react'
import Hero from '../components/Hero.jsx'
import ProductList from '../components/ProductList.jsx'

function Home() {
    return (
        <div>
            <Hero />

            {/* List Header */}
            <div className='list-header'>
                <h2 className='list-title'>ALL <span className="highlight">ITEMS</span></h2>
            </div>
            <ProductList />
        </div>
    )
}

export default Home