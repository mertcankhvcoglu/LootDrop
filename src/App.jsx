import React from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'



const App = () => {
  return (
    <div className='app-container'>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
      </Routes>
      {/* <Hero />
      <ProductCard /> */}
      {/* <ProductList /> */}

    </div>
  )
}

export default App;