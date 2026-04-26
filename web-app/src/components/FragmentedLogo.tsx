import { motion } from 'framer-motion';

const FragmentedLogo = () => {
    // Generate randomized volumetric particles
    const pixels = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 200 - 100, 
        y: Math.random() * -200,
        z: Math.random() * 200 - 100, // Z-depth for 3D swarm
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4
    }));

    return (
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            perspective: '1200px', // Creates 3D depth
            transformStyle: 'preserve-3d'
        }}>
            {/* The Main Fragmented "N" with Continuous 3D Rotation */}
            <motion.div
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '100%',
                    transformStyle: 'preserve-3d'
                }}
                animate={{ 
                    rotateY: [0, 360],
                    rotateX: [10, -10, 10], // Subtle nodding for complexity
                }}
                transition={{ 
                    rotateY: { repeat: Infinity, duration: 25, ease: "linear" },
                    rotateX: { repeat: Infinity, duration: 15, ease: "easeInOut" }
                }}
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 
                    filter: 'drop-shadow(0 0 40px rgba(0, 212, 255, 0.4))',
                    transform: 'translateZ(50px)' // Pops the "N" off the background
                }}>
                    <defs>
                        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00D4FF" />
                            <stop offset="50%" stopColor="#1A6FFF" />
                            <stop offset="100%" stopColor="#020B18" />
                        </linearGradient>
                    </defs>

                    {/* Low-Poly Fragmented Structure */}
                    <path d="M20 15L45 15V85L20 85V15Z" fill="url(#logoGrad)" />
                    <path d="M45 15L80 85H55L20 15H45Z" fill="#1A6FFF" style={{ opacity: 0.6 }} />
                    <path d="M55 15L80 15V65L55 35V15Z" fill="#00D4FF" fillOpacity="0.8" />
                </svg>
            </motion.div>

            {/* Volumetric Data Swarm */}
            {pixels.map((pixel, i) => (
                <motion.div
                    key={pixel.id}
                    style={{
                        position: 'absolute',
                        width: `${pixel.size}px`,
                        height: `${pixel.size}px`,
                        backgroundColor: i % 2 === 0 ? '#00D4FF' : '#1A6FFF',
                        top: '50%',
                        left: '50%',
                        zIndex: 5,
                        boxShadow: '0 0 15px rgba(0, 212, 255, 0.8)',
                    }}
                    animate={{
                        x: [0, pixel.x],
                        y: [0, pixel.y],
                        z: [0, pixel.z],
                        opacity: [0, 1, 0],
                        scale: [1, 2, 0]
                    }}
                    transition={{
                        duration: pixel.duration,
                        repeat: Infinity,
                        delay: pixel.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default FragmentedLogo;
