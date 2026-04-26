import { motion } from 'framer-motion';
import FragmentedLogo from './FragmentedLogo';
import AsciiCube from './AsciiCube';

const Hero = () => {
    return (
        <header id="home" style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            padding: '8rem 4rem 4rem', 
            overflow: 'hidden', 
            backgroundColor: 'var(--navy-deep)',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Background Layers */}
            <AsciiCube />
            <div className="hero-grid"></div>
            <div className="glow-tr"></div>
            <div className="glow-bl"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: 0.15, 
                    scale: 1,
                    y: [0, -20, 0],
                }}
                transition={{ 
                    opacity: { duration: 2 },
                    scale: { duration: 2 },
                    y: { repeat: Infinity, duration: 12, ease: "easeInOut" }
                }}
                style={{ 
                    position: 'absolute', 
                    left: '5%', // Positioned behind the text on the left
                    top: '40%',
                    transform: 'translateY(-50%)',
                    width: '700px',
                    height: '700px',
                    pointerEvents: 'none',
                    zIndex: 0,
                    filter: 'blur(2px)' // Creating that depth-of-field effect behind text
                }}
            >
                <FragmentedLogo />
            </motion.div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: '800px' }}
                >
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        padding: '0.4rem 1.2rem', 
                        border: '1px solid var(--cyan)', 
                        clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                        marginBottom: '2rem',
                        background: 'rgba(0, 212, 255, 0.05)'
                    }}>
                        <span className="pulsing-dot"></span>
                        <span className="mono" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--cyan)', textTransform: 'uppercase' }}>
                            Powering Smart Businesses
                        </span>
                    </div>

                    <h1 className="orbitron" style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '2rem', fontWeight: 900 }}>
                        We Build <br />
                        <span className="section-title"><span>Digital Systems</span></span> <br />
                        That Scale.
                    </h1>

                    <p style={{ 
                        fontSize: '1.2rem', 
                        color: 'var(--text-muted)', 
                        marginBottom: '3rem', 
                        maxWidth: '600px',
                        fontFamily: 'Rajdhani',
                        fontWeight: 400
                    }}>
                        Nexora Digital delivers premium automation, ERP, POS, and custom software solutions engineered for enterprise performance and built for the future.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#services" className="btn btn-primary">Explore Services</a>
                        <a href="#about" className="btn btn-outline">View Our Work</a>
                    </div>
                </motion.div>
            </div>
            
            {/* Scanline Overlay */}
            <div style={{ 
                position: 'fixed',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0, 212, 255, 0.01) 3px)',
                pointerEvents: 'none',
                zIndex: 1000
            }}></div>
        </header>
    );
};

export default Hero;
