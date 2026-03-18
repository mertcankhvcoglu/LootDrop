import React from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'



const App = () => {
  return (
    <div className='app-container'>

      <Header />

      <Routes>
        <Route path="/LootDrop/" element={<Home />} />

        <Route path="/LootDrop/products/" element={<Shop />} />
      </Routes>
      {/* <Hero />
      <ProductCard /> */}
      {/* <ProductList /> */}

    </div>
  )
}

export default App;