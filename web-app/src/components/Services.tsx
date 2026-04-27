import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ShoppingCart, Code, Zap, Smartphone, BarChart3, ShieldCheck, Share2, HelpCircle } from 'lucide-react';

const services = [
    { num: '01', title: 'ERP Solutions', tags: ['SAP', 'Custom ERP', 'Odoo'], desc: 'End-to-end management for educational institutions, from admissions to exams and finance.', icon: <LayoutGrid size={32} /> },
    { num: '02', title: 'POS Systems', tags: ['Retail', 'F&B', 'Cloud POS'], desc: 'Streamline your retail operations with our intelligent and easy-to-use Point of Sale systems.', icon: <ShoppingCart size={32} /> },
    { num: '03', title: 'Custom Software', tags: ['React', 'Node.js', 'TypeScript'], desc: 'Tailor-made software solutions designed to solve your unique business challenges.', icon: <Code size={32} /> },
    { num: '04', title: 'Business Automation', tags: ['RPA', 'API Integration', 'AI/ML'], desc: 'Automate repetitive tasks and focus on what matters most—growing your business.', icon: <Zap size={32} /> },
    { num: '05', title: 'Mobile Apps', tags: ['React Native', 'Flutter', 'iOS/Android'], desc: 'High-performance, cross-platform apps built for seamless user engagement.', icon: <Smartphone size={32} /> },
    { num: '06', title: 'Data & Analytics', tags: ['BI Dashboards', 'Python', 'Power BI'], desc: 'Advanced reporting and data analysis to help you make informed business decisions.', icon: <BarChart3 size={32} /> },
    { num: '07', title: 'Cybersecurity', tags: ['Pen Testing', 'ISO 27001', 'GDPR'], desc: 'Round-the-clock protection to ensure your enterprise data remains secure and compliant.', icon: <ShieldCheck size={32} /> },
    { num: '08', title: 'API & Integrations', tags: ['REST', 'GraphQL', 'Webhooks'], desc: 'Connect your systems with high-performance APIs and specialized webhooks.', icon: <Share2 size={32} /> },
    { num: '09', title: 'IT Consulting', tags: ['Strategy', 'Cloud', 'DevOps'], desc: 'Strategic technical assistance to ensure your business scaling never stops.', icon: <HelpCircle size={32} /> },
];

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        setRotate({ x: rotateX, y: rotateY });
        setSpotlight({ x, y, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setSpotlight(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <motion.div 
            ref={cardRef}
            key={service.num}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ backgroundColor: 'var(--navy-card)' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                padding: 'clamp(1.5rem, 5vw, 3.5rem) clamp(1.2rem, 4vw, 3rem)', 
                backgroundColor: 'var(--navy-mid)', 
                position: 'relative',
                overflow: 'hidden',
                transition: 'var(--transition)',
                cursor: 'pointer',
                minHeight: 'clamp(300px, 40vh, 360px)',
                width: '100%',
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transformStyle: 'preserve-3d',
                background: spotlight.opacity > 0 
                    ? `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, rgba(0, 212, 255, 0.1), transparent 80%), var(--navy-mid)`
                    : 'var(--navy-mid)'
            }}
        >
            {/* Hover Border Reveal */}
            <motion.div 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '2px', 
                    background: 'linear-gradient(90deg, var(--cyan), var(--blue))',
                    scaleX: 0
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
            />

            <div className="orbitron" style={{ 
                position: 'absolute', 
                top: 'clamp(1rem, 3vw, 2rem)', 
                right: 'clamp(1.5rem, 4vw, 2.5rem)', 
                fontSize: 'clamp(3rem, 10vw, 5rem)', 
                fontWeight: 900, 
                color: 'rgba(0, 212, 255, 0.06)',
                pointerEvents: 'none',
                transform: 'translateZ(20px)'
            }}>
                {service.num}
            </div>

            <div style={{ color: 'var(--cyan)', marginBottom: '1.5rem', transform: 'translateZ(30px)' }}>
                {service.icon}
            </div>

            <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontWeight: 700, marginBottom: '1rem', transform: 'translateZ(25px)' }}>{service.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6, transform: 'translateZ(15px)' }}>{service.desc}</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', transform: 'translateZ(10px)' }}>
                {service.tags.map((tag: string) => (
                    <span key={tag} className="mono" style={{ 
                        fontSize: '0.6rem', 
                        padding: '2px 8px', 
                        border: '1px solid rgba(0, 212, 255, 0.2)', 
                        color: 'var(--cyan)',
                        borderRadius: '2px'
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const Services = () => {
    return (
        <section id="services" style={{ padding: 'clamp(4rem, 10vw, 7.5rem) 0', backgroundColor: 'var(--navy-deep)' }}>
            <div className="container">
                <span className="section-tag"></span>
                <h2 className="section-title">Comprehensive <span>Digital Services</span></h2>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
                    gap: '2rem',
                    marginTop: 'clamp(2rem, 5vw, 5rem)'
                }}>
                    {services.map((service, index) => (
                        <div key={service.num} style={{ transformStyle: 'preserve-3d', width: '100%' }}>
                            <ServiceCard service={service} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
