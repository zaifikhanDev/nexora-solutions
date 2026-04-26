import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Terminal = () => {
    const [lines, setLines] = useState<string[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    const terminalContent = [
        "nexora@digital:~$ ./deploy.sh",
        "✓ Building optimized bundle...",
        "✓ Running 847 unit tests PASSED",
        "✓ Security scan... CLEAN",
        "✓ Performance audit... 98/100",
        "✓ Deploying to cluster...",
        "✓ Health checks passing...",
        "",
        "🚀 Deployment successful!",
        "# Uptime: 99.97% | Latency: 42ms",
        "nexora@digital:~$ "
    ];

    useEffect(() => {
        if (isInView) {
            let currentLine = 0;
            const interval = setInterval(() => {
                if (currentLine <= terminalContent.length) {
                    setLines(terminalContent.slice(0, currentLine));
                    currentLine++;
                } else {
                    clearInterval(interval);
                }
            }, 600);
            return () => clearInterval(interval);
        }
    }, [isInView]);

    return (
        <div style={{ 
            background: '#010D1A', 
            borderRadius: '12px', 
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.85rem'
        }}>
            <div style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '10px 15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)'
            }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }}></span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '1px' }}>nexora — bash</div>
            </div>
            <div style={{ padding: '20px', minHeight: '320px' }}>
                {lines.map((line, i) => (
                    <div key={i} style={{ 
                        marginBottom: '6px', 
                        color: line.includes('✓') || line.includes('🚀') ? '#4ade80' : 
                               line.startsWith('nexora@digital') ? 'var(--cyan)' : 
                               line.startsWith('#') ? 'var(--text-muted)' : 'white'
                    }}>
                        {line}
                        {i === lines.length - 1 && line === "nexora@digital:~$ " && (
                            <motion.span 
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                style={{ width: '8px', height: '15px', background: 'var(--cyan)', display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Terminal;
