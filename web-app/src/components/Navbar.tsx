import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' }
    ];

    return (
        <nav style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: isScrolled ? '70px' : '85px', 
            background: isScrolled ? 'rgba(2, 11, 24, 0.98)' : 'transparent', 
            backdropFilter: isScrolled ? 'blur(20px)' : 'none', 
            display: 'flex', 
            alignItems: 'center', 
            zIndex: 1000, 
            transition: 'var(--transition)',
            borderBottom: isScrolled ? '1px solid var(--border)' : 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className="orbitron" 
                    style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '1px', cursor: 'default' }}
                >
                    NEXORA<span style={{ color: 'var(--cyan)', transition: '0.3s', textShadow: '0 0 10px rgba(0, 212, 255, 0.3)' }}> DIGITAL</span>
                </motion.div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <ul style={{ display: 'flex', gap: '2.5rem', margin: 0 }} className="desktop-menu">
                        {navLinks.map((link, i) => (
                            <li key={i} style={{ position: 'relative' }}>
                                <a 
                                    href={link.href} 
                                    style={{ 
                                        fontFamily: 'Rajdhani', 
                                        fontWeight: 600, 
                                        fontSize: '0.9rem',
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-primary)', 
                                        transition: 'var(--transition)' 
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="#contact" className="btn btn-outline" style={{ padding: '0.6rem 1.8rem', fontSize: '0.8rem' }}>
                        Get a Quote
                    </a>
                    
                    <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', cursor: 'pointer', color: 'var(--cyan)' }}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </div>
                </div>
            </div>
            
            <style>{`
                @media (max-width: 992px) {
                    .desktop-menu { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
