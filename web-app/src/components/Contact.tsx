import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('https://formspree.io/f/mdayjkgz', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                alert("Message Sent! Thank you for contacting Nexora Digital.");
                setFormState({ name: '', email: '', message: '' });
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("Connection error. Please check your internet and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" style={{ background: 'var(--dark)', padding: '100px 0', color: 'var(--white)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 1fr', gap: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Nexora<span style={{ color: 'var(--secondary)' }}>Digital</span></div>
                        <p style={{ opacity: 0.7, marginBottom: '2rem', maxWidth: '400px' }}>
                            Let's Digitize Your Business. Partner with us for smarter solutions.
                        </p>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <p style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={18} color="var(--secondary)" /> xaifikhan768@gmail.com
                            </p>
                            <p style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Phone size={18} color="var(--secondary)" /> +92 322 833 2623
                            </p>
                        </div>
                        <a href="https://wa.me/923228332623" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', gap: '10px', borderRadius: '12px' }}>
                            <MessageCircle size={20} /> Chat via WhatsApp
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '3rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    >
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Contact Us</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    style={{ width: '100%', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--white)', borderRadius: '10px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    style={{ width: '100%', padding: '1.2rem', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '4px', outline: 'none', fontFamily: 'Rajdhani', fontWeight: 500 }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    required
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    style={{ width: '100%', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--white)', borderRadius: '10px', outline: 'none', resize: 'none' }}
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.9rem', opacity: 0.5, marginTop: '5rem' }}>
                    &copy; {new Date().getFullYear()} Nexora Digital Solutions. All Rights Reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;
