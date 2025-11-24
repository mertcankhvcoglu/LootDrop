import React, { useState } from 'react'
import './css/Header.css'
import lootdropLogo from './assets/images/lootdrop-logo2.png'
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { MdPerson } from "react-icons/md";


const Header = () => {

    //Products dropdown menu open-close - Ürünler aşağıkayar menü aç-kapa değişkeni
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<header className="main-header">
        {/* SOL KISIM: LOGO */}
        <div className="logo-area">
            <img className='header-logo' src={lootdropLogo} alt='LootDrop'></img>
            <span className='logo-text'>LootDrop</span>
        </div>

        {/* ORTA KISIM: NAVİGASYON */}
        <nav className="nav-links">

            {/* Dropdown Menü Alanı */}
            <div
                className="nav-item dropdown-container"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <a href="#" className="nav-link">Ürünler ▾</a>

                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">👾 Figures</div>
                        <div className="dropdown-item">⌨️ Keycaps</div>
                        <div className="dropdown-item">💡 Lighting</div>
                        <div className="dropdown-item">🎧 Audio</div>
                        <div className="dropdown-item">👕 Apparel</div>
                        <div className="dropdown-item">🎒 Accessories</div>
                    </div>
                )}
            </div>

            <a href="#" className="nav-link">İndirim</a>
            <a href="#" className="nav-link">Yakında</a>
        </nav>

        {/* SAĞ KISIM: ARAMA ve İKONLAR */}
        <div className="header-actions">
            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Ara..." />
            </div>

            <div className="icon-group">
                <button className="icon-btn"><MdOutlineShoppingCart /></button>
                <button className="icon-btn"><IoMdHeart /></button>
                <button className="icon-btn"><MdPerson /></button>
            </div>
        </div>
    </header>


    );
};
export default Header
