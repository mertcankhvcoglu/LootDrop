import React, { useState } from 'react'
import '../css/Header.css'
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';


const Header = () => {

    //Products dropdown menu open-close - Ürünler aşağıkayar menü aç-kapa değişkeni
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  //mobile dropdown state

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <header className="main-header">


            {/* LOGO */}
            <div className="logo-area">
                <Link to="/LootDrop" style={{ textDecoration: 'none' }}>
                    <span className='logo-text'>LootDrop</span>
                </Link>
            </div>

            {/* LEFT PART - NAVIGATION */}
            <nav className="nav-links desktop-nav">

                {/* Desktop Dropdown Menu (Hidden Mobile) */}
                <div
                    className="nav-item dropdown-container"
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <a href="#" className="nav-link">Products ▾</a>

                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <Link
                                to="/LootDrop/products"
                                style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}
                                className="dropdown-item">
                                All Categories
                            </Link>
                            <div className="dropdown-item">Figures</div>
                            <div className="dropdown-item">Keycaps</div>
                            <div className="dropdown-item">Lighting</div>
                            <div className="dropdown-item">Accessories</div>
                        </div>
                    )}
                </div>

                <a href="#" className="nav-link">-%- Black Market -%-</a>
                <a href="#" className="nav-link">Soon</a>
            </nav>

            {/* RIGHT PART : SEARCH AND ICONS */}
            <div className="header-actions">
                <div className="search-box desktop-search">
                    <span className="search-icon"><AiOutlineSearch /></span>
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="icon-group">
                    <button className="icon-btn"><MdOutlineShoppingCart /></button>
                    <button className="icon-btn"><IoMdHeart /></button>
                    <button className="icon-btn desktop-only"><MdPerson /></button>
                    {/* YENİ: HAMBURGER BUTONU (Sadece Mobilde Görünecek) */}
                    <button className="icon-btn mobile-menu-btn" onClick={toggleMobileMenu}>
                        <HiOutlineMenuAlt3 />
                    </button>
                </div>
            </div>

            {/* MOBILE MENU (OVERLAY) */}
            {/* control w css  */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>

                <div className="mobile-menu-header">
                    <span className='logo-text'>Menu</span>
                    <button className="icon-btn close-btn" onClick={toggleMobileMenu}>
                        <HiX />
                    </button>
                </div>

                <div className="mobile-links">
                    <a href="#" className="mobile-link">All Categories</a>
                    <a href="#" className="mobile-link">Figures</a>
                    <a href="#" className="mobile-link">Keyboard & Keycap</a>
                    <a href="#" className="mobile-link">Lightning</a>
                    <a href="#" className="mobile-link">Accessories</a>

                    <a href="#" className="mobile-link highlight">Black Market %</a>
                    <hr className="mobile-divider" />
                    <a href="#" className="mobile-link">Profile</a>
                </div>
            </div>
        </header>


    );
};
export default Header
