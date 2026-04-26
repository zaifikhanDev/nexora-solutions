import { motion } from 'framer-motion';

const techs = [
    'React', 'React Native', 'TypeScript', 'Node.js', 
    'Python', 'AWS', 'PostgreSQL', 'MongoDB', 
    'Docker', 'Kubernetes', 'Redis', 'GraphQL'
];

const TechStack = () => {
    return (
        <section id="tech" style={{ padding: '100px 0' }}>
            <div className="container">
                <span className="section-tag"></span>
                <h2 className="section-title">The Tools We Use to <span>Build</span></h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginTop: '3rem' }}>
                    {techs.map((tech, index) => (
                        <motion.div 
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -4, borderColor: 'var(--cyan)', background: 'rgba(0, 212, 255, 0.03)' }}
                            style={{ 
                                padding: '2rem 1rem', 
                                background: 'var(--navy-mid)', 
                                border: '1px solid var(--border)', 
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: 'var(--text-muted)',
                                transition: 'var(--transition)',
                                cursor: 'default'
                            }}
                        >
                            {tech}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
