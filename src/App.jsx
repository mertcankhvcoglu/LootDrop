import React from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'



const App = () => {
  return (
    <div className='app-container'>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetailPage/>}/>
      </Routes>
      {/* <Hero />
      <ProductCard /> */}
      {/* <ProductList /> */}

    </div>
  )
}

export default App;