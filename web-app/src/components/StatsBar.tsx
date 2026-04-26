import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const StatItem = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 30);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 30);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} style={{ textAlign: 'center', padding: '2rem', borderRight: '1px solid var(--border)' }}>
            <h3 className="orbitron" style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, var(--cyan), var(--blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
                {count}{suffix}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {label}
            </p>
        </div>
    );
};

const StatsBar = () => {
    return (
        <div style={{ background: 'var(--navy-mid)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: 0 }}>
                <StatItem value={50} label="Projects Delivered" suffix="+" />
                <StatItem value={30} label="Enterprise Clients" suffix="+" />
                <StatItem value={9} label="Core Services" />
                <StatItem value={99} label="Client Retention" suffix="%" />
            </div>
        </div>
    );
};

export default StatsBar;
