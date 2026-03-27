import React from 'react'
import Hero from '../components/Hero.jsx'
import ProductList from '../components/ProductList.jsx'

// App.jsx'ten gelen searchTerm prop'unu karşılıyoruz
function Home({ searchTerm }) { 
    return (
        <div>
            <Hero />
            {/* Veriyi ProductList'e paslıyoruz */}
            <ProductList searchTerm={searchTerm} />
        </div>
    )
}

export default Home