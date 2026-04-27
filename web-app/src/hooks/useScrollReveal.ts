import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            },
            { threshold: 0.13 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
            
            // Add initial reveal class
            sectionRef.current.classList.add('reveal-hidden');
            
            // Stagger children
            const children = sectionRef.current.querySelectorAll('.reveal-item');
            children.forEach((child, i) => {
                (child as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
            });
        }

        return () => observer.disconnect();
    }, []);

    return sectionRef;
};
