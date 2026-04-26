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

const Services = () => {
    return (
        <section id="services" style={{ padding: '100px 0', backgroundColor: 'var(--navy-deep)' }}>
            <div className="container">
                <span className="section-tag"></span>
                <h2 className="section-title">Comprehensive <span>Digital Services</span></h2>
                
                <div className="grid-3" style={{ 
                    gap: '1.5px', 
                    backgroundColor: 'rgba(0, 212, 255, 0.15)',
                    border: '1.5px solid rgba(0, 212, 255, 0.15)'
                }}>
                    {services.map((service, index) => (
                        <motion.div 
                            key={service.num}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ backgroundColor: 'var(--navy-card)' }}
                            style={{ 
                                padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)', 
                                backgroundColor: 'var(--navy-mid)', 
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'var(--transition)',
                                cursor: 'pointer',
                                minHeight: '340px'
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
                                top: '2rem', 
                                right: '2.5rem', 
                                fontSize: '4rem', 
                                fontWeight: 900, 
                                color: 'rgba(0, 212, 255, 0.06)',
                                pointerEvents: 'none'
                            }}>
                                {service.num}
                            </div>

                            <div style={{ color: 'var(--cyan)', marginBottom: '1.5rem' }}>
                                {service.icon}
                            </div>

                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{service.desc}</p>
                            
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {service.tags.map(tag => (
                                    <span key={tag} className="mono" style={{ 
                                        fontSize: '0.65rem', 
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
