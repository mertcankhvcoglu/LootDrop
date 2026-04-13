import React from 'react' // useState kalıntısı silindi
import './App.css'
import Header from './components/Header.jsx'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
// YENİ: Sepet sayfasını içeri alıyoruz (Birazdan pages klasöründe oluşturacağız)
import CartPage from './pages/CartPage.jsx'

// context provider'ı içeri alıyoruz Bean container'ın giriş kapısı
import { CartProvider } from './context/CartContext.jsx'

const App = () => {
  // Arama kelimesi artık Header içinde Local State olarak yönetiliyor.
  // Bu sayede App bileşeni her harf değişiminde gereksiz yere render edilmiyor.
  // "Single Source of Truth" prensibi, bu özellik için Header seviyesine indirildi.

  return (

    <CartProvider>

      <div className='app-container'>
        {/* Header artık props almadan kendi içindeki autocomplete mantığını yönetiyor */}
        <Header />

        <Routes>
          {/* Home ve Shop sayfaları artık prop drilling zahmetinden ve gereksiz render yükünden kurtuldu */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          {/* YENİ: Sepet Sayfası Rotası */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>

    </CartProvider>
  )
}

export default App;