import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{ padding: '100px 0' }}>
            <div className="container">
                <div className="section-header center">
                    <span className="subtitle">About Us</span>
                    <h2>Transforming Businesses for the <span>Digital Era</span></h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--secondary)', margin: '1.5rem auto 0' }}></div>
                </div>
                
                <div className="grid-about">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            At Nexora Digital, we believe technology should be an enabler, not a hurdle. We specialize in transforming traditional business operations into streamlined, automated digital systems that scale.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Whether you're a school looking for a robust ERP or a retail business needing a seamless POS, our solutions are built with efficiency and business growth at their core.
                        </p>
                        <ul style={{ padding: 0 }}>
                            {['Expert Custom Development', 'Scalable Cloud Foundations', 'Data-Driven Business Automation', '24/7 Technical Support'].map((item, i) => (
                                <li key={i} style={{ position: 'relative', paddingLeft: '30px', marginBottom: '0.8rem', fontWeight: 500, listStyle: 'none' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cyan)', fontWeight: 900 }}>✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    
                    <div className="grid-2" style={{ gap: '1.5rem' }}>
                        {[
                            { val: '100+', label: 'Projects Delivered' },
                            { val: '98%', label: 'Client Satisfaction' },
                            { val: '24/7', label: 'Tech Support' },
                            { val: '10+', label: 'Years Experience' }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ padding: '2.5rem 1.5rem', background: 'var(--navy-mid)', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border)' }}
                            >
                                <h3 className="orbitron" style={{ fontSize: '2rem', color: 'var(--cyan)', marginBottom: '0.5rem' }}>{stat.val}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
