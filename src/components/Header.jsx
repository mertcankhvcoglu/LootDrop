import React, { useState } from 'react'
import '../css/Header.css'
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Header = () => {
    // Dropdown state'i kaldırıldı, sadece mobil menü state'i kaldı
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <header className="main-header">

            {/* LOGO */}
            <div className="logo-area">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className='logo-text'>LootDrop</span>
                </Link>
            </div>

            {/* LEFT PART - NAVIGATION */}
            <nav className="nav-links desktop-nav">
                {/* Dropdown kaldırıldı, direkt Link eklendi */}
                <Link to="/products/" className="nav-link">
                    Products
                </Link>

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
                    <button className="icon-btn mobile-menu-btn" onClick={toggleMobileMenu}>
                        <HiOutlineMenuAlt3 />
                    </button>
                </div>
            </div>

            {/* MOBILE MENU (OVERLAY) */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <span className='logo-text'>Menu</span>
                    <button className="icon-btn close-btn" onClick={toggleMobileMenu}>
                        <HiX />
                    </button>
                </div>

                <div className="mobile-links">
                    {/* Mobil tarafta da linki güncelledik */}
                    <Link to="/LootDrop/products" className="mobile-link" onClick={toggleMobileMenu}>
                        All Categories
                    </Link>
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

export default Header;