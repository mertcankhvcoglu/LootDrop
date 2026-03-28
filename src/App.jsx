import React, { useState } from 'react' // 1. useState eklendi
import './App.css'
import Header from './components/Header.jsx'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

const App = () => {
  // Arama kelimesini burada parent olarak tanımlı
  //"Single Source of Truth"
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='app-container'>
      {/* 3. Header'a hem değeri hem de fonksiyonu gönderiyoruz. 
          Böylece Header yazacak, buradaki state güncellenecek. */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
        {/* 4. Home ve Shop sayfalarına searchTerm'ü prop olarak geçiyoruz. 
            Bu sayfalar da içlerindeki ProductList'e bu veriyi aktaracak. */}
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/products" element={<Shop searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App;