import React from 'react'
import Hero from '../components/Hero.jsx'
import ProductList from '../components/ProductList.jsx'

// searchTerm prop'u artık buradan geçmiyor (Header içinde local yönetiliyor)
function Home() {
    return (
        <div>
            <Hero />
            {/* ProductList artık bağımsız; genel aramayı değil kendi listelemesini yapar */}
            <ProductList />
        </div>
    )
}

export default Home