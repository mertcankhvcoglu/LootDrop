import React from 'react'
import cp77 from './assets/images/Cyberpunk-2077-Art-by-J-Hill.jpg'
import './css/Hero.css'

const Hero = () => {
    return (
        <section className='hero-section'>

            {/* SOL TARAF YAZILAR*/}
            <div className='hero-content'>

                <h1 className='hero-title'>EQUIP YOUR <br />
                    <span className="highlight">REALITY</span>
                </h1>
                <p className='hero-subtitle'>Curated drops for the ultime setup</p>

                <div className='hero-buttons'>
                    <button className='btn-primary'>Explore Collection</button>
                    <button className='btn-secondary'>How it works?</button>
                </div>
            </div>

            {/* Cyberpunk-2077-Art-by-J-Hill */}

            {/* SAĞ TARAF GÖRSEL */}
            <div className='hero-image-container'>
                <img
                    src={cp77}
                    alt='EXPLORE'
                    className='hero-img'
                />
                <div className='hero-glow'></div>
            </div>

        </section>
    )
}
export default Hero