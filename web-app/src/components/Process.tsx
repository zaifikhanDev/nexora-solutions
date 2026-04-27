import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const steps = [
    { id: '01', title: 'Discovery', desc: 'Deep-dive into goals, tech landscape, and user needs.' },
    { id: '02', title: 'Architecture', desc: 'System design, wireframes, technical blueprint.' },
    { id: '03', title: 'Development', desc: 'Agile sprints, CI/CD pipelines, code reviews.' },
    { id: '04', title: 'Launch & Scale', desc: 'Deployment, monitoring, training, 90-day support.' },
];

const Process = () => {
    const revealRef = useScrollReveal();
    return (
        <section ref={revealRef} id="process" style={{ padding: '100px 0', position: 'relative' }}>
            <div className="container">
                <div className="reveal-item">
                    <span className="section-tag"></span>
                    <h2 className="section-title">Our Engineered <span>Process</span></h2>
                </div>

                <div style={{ position: 'relative', marginTop: '6rem' }}>
                    {/* Connector Line */}
                    <div 
                        className="desktop-menu" // Using desktop-menu as a proxy for "show on desktop only"
                        style={{
                            position: 'absolute',
                            top: '40px',
                            left: '10%',
                            right: '10%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, var(--cyan), var(--blue), var(--cyan), transparent)',
                            opacity: 0.3,
                            zIndex: 0
                        }} 
                    />

                    <div className="grid-4" style={{ position: 'relative', zIndex: 1 }}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                className="reveal-item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: index === 0 ? 'linear-gradient(135deg, var(--cyan), var(--blue))' : 'var(--navy-deep)',
                                    border: '1px solid var(--cyan)',
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    color: index === 0 ? 'white' : 'var(--cyan)',
                                    fontSize: '1.5rem',
                                    fontWeight: 900
                                }}>
                                    {step.id}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{step.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
