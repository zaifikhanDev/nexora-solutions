import { motion } from 'framer-motion';
import { Clock, Shield, BarChart } from 'lucide-react';
import Terminal from './Terminal';

const WhyNexora = () => {
    const features = [
        { icon: <Clock />, title: 'On-Time Delivery', desc: 'Rigorous sprint planning ensures every project ships on schedule.' },
        { icon: <Shield />, title: 'Enterprise-Grade Quality', desc: 'Every line reviewed, every system stress-tested.' },
        { icon: <BarChart />, title: 'Scalable Architecture', desc: 'Systems built to grow from 10 to 100,000+ users.' }
    ];

    return (
        <section id="why" style={{ padding: '120px 0', backgroundColor: 'var(--navy-mid)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 1fr', gap: '6rem', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-tag"></span>
                    <h2 className="section-title">Built for <span>Performance</span></h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem' }}>
                        {features.map((feature, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    flexShrink: 0,
                                    background: 'rgba(0, 212, 255, 0.05)',
                                    border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--cyan)',
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{feature.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '450px' }}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Terminal />
                </motion.div>
            </div>
        </section>
    );
};

export default WhyNexora;
