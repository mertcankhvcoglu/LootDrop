import React, { useState, useEffect, useRef } from 'react' // 1. useEffect ve useRef eklendi
import '../css/Header.css'
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'; // 2. useNavigate eklendi
import { searchProductsQuickly } from '../services/ProductService'; // Servisi çağırdık

// DİKKAT: Artık props üzerinden gelen searchTerm'ü değil, içerideki localState'i kullanacağız
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // --- YENİ ARAMA STATE'LERİ ---
    const [localSearchTerm, setLocalSearchTerm] = useState(""); // Input'un içindeki canlı yazı
    const [suggestions, setSuggestions] = useState([]); // Gelen öneri ürünleri
    const [showDropdown, setShowDropdown] = useState(false); // Menü görünsün mü?
    
    const dropdownRef = useRef(null); // Menü dışına tıklanınca kapatmak için ref
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    // --- DEBOUNCING & API CALL ---
    // Bu useEffect, kullanıcı yazmayı bırakınca 400ms bekleyip istek atar.
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (localSearchTerm.trim().length >= 2) {
                const results = await searchProductsQuickly(localSearchTerm);
                setSuggestions(results);
                setShowDropdown(true);
            } else {
                setSuggestions([]);
                setShowDropdown(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [localSearchTerm]);

    // --- CLICK OUTSIDE ---
    // Arama menüsü dışına tıklandığında menüyü kapatan mantık
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    // --- SELECTION HANDLER ---
    const handleSelectProduct = (productId) => {
        setShowDropdown(false); // Menüyü kapat
        setLocalSearchTerm(""); // Arama kutusunu temizle
        navigate(`/product/${productId}`); // Detay sayfasına uçur
    };

    return (
        <header className="main-header" ref={dropdownRef}>
            {/* LOGO */}
            <div className="logo-area">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className='logo-text'>LootDrop</span>
                </Link>
            </div>

            {/* LEFT PART - NAVIGATION */}
            <nav className="nav-links desktop-nav">
                <Link to="/products" className="nav-link">
                    Products
                </Link>
                <a href="#" className="nav-link">-%- Black Market -%-</a>
                <a href="#" className="nav-link">Soon</a>
            </nav>

            {/* RIGHT PART : SEARCH AND ICONS */}
            <div className="header-actions">
                {/* Arama Kutusu Sarmalayıcı */}
                <div className="search-wrapper desktop-search">
                    <div className="search-box">
                        <span className="search-icon"><AiOutlineSearch /></span>
                        <input 
                            type="text" 
                            placeholder="SEARCH_PROTOCOL..." 
                            value={localSearchTerm} // Local state kullanıyoruz
                            onChange={(e) => setLocalSearchTerm(e.target.value)} 
                            onFocus={() => localSearchTerm.length >= 2 && setShowDropdown(true)}
                        />
                    </div>

                    {/* --- ÖNERİLER DROPDOWN --- */}
                    {showDropdown && (
                        <div className="search-dropdown">
                            {suggestions.length > 0 ? (
                                suggestions.map((product) => (
                                    <div 
                                        key={product.id} 
                                        className="dropdown-item"
                                        onClick={() => handleSelectProduct(product.id)}
                                    >
                                        <img src={product.imageUrl} alt={product.name} className="item-thumb" />
                                        <div className="item-details">
                                            <span className="item-name">{product.name}</span>
                                            <span className="item-price">${product.price?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-result">NO_HARDWARE_FOUND</div>
                            )}
                        </div>
                    )}
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
                    <Link to="/products" className="mobile-link" onClick={toggleMobileMenu}>
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