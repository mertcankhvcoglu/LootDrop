import React from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Route, Routes } from 'react-router-dom' // HashRouter importunu buradan sildik

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

const App = () => {
  return (
    <div className='app-container'>
      {/* Header artık güvenle Linkleri çalıştırabilir */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App;