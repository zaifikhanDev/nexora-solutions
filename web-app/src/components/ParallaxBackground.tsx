import { useEffect, useRef, useState, useMemo } from 'react';

const ParallaxBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const stars = useMemo(() => Array.from({ length: 180 }, () => ({
        x: Math.random() * 2000 - 500,
        y: Math.random() * 2000 - 500,
        size: Math.random() * 2,
        parallaxFactor: Math.random() * 0.15 + 0.05,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2
    })), []);

    const orbs = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
        x: Math.random() * 2000,
        y: (i / 6) * 2000,
        radius: 200 + Math.random() * 200,
        color: i % 2 === 0 ? 'rgba(0, 212, 255, 0.08)' : 'rgba(26, 111, 255, 0.08)',
        speed: 0.2 + (i / 6) * 0.8
    })), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;
        let smoothScrollY = window.scrollY;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            time += 16;
            // Smooth lerp for scroll position
            smoothScrollY += (window.scrollY - smoothScrollY) * 0.1;
            
            ctx.fillStyle = '#020B18';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Stars
            stars.forEach(star => {
                const x = star.x + mouse.x * 50 * star.parallaxFactor;
                const y = (star.y - smoothScrollY * star.parallaxFactor + 2000) % 2000;
                const alpha = (Math.sin(time * star.twinkleSpeed + star.phase) + 1) / 2;
                ctx.fillStyle = `rgba(240, 248, 255, ${alpha * 0.8})`;
                ctx.beginPath();
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 2. Orbs
            orbs.forEach(orb => {
                const x = orb.x + mouse.x * 100 * orb.speed;
                const y = orb.y - smoothScrollY * orb.speed;
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // 3. Perspective Grid
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
            ctx.lineWidth = 1;
            const gridSize = 100;
            const gridOffset = (smoothScrollY * 0.8) % gridSize;
            const mouseOffsetX = mouse.x * 50;

            for (let x = -gridSize * 2; x < canvas.width + gridSize * 2; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x + mouseOffsetX, 0);
                ctx.lineTo(x + mouseOffsetX * 3, canvas.height);
                ctx.stroke();
            }
            for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
                const yy = (y - gridOffset + gridSize) % (canvas.height + gridSize);
                const opacity = (yy / canvas.height);
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.1})`;
                ctx.beginPath();
                ctx.moveTo(0, yy);
                ctx.lineTo(canvas.width, yy);
                ctx.stroke();
            }

            // 4. Advanced Parallax Donuts (Main + Decor)
            const donuts = [
                { scale: 0.22, speed: 0.4, alpha: 0.18, xOff: 0.2, yOff: 0.3 },
                { scale: 0.12, speed: 0.7, alpha: 0.08, xOff: -0.3, yOff: 0.1 },
                { scale: 0.08, speed: 1.2, alpha: 0.05, xOff: 0.4, yOff: 0.6 }
            ];

            donuts.forEach((dConfig, dIdx) => {
                // Rotation influenced by both time AND scroll for that "active" parallax feel
                const A = time * 0.0012 + smoothScrollY * 0.002 * (dIdx + 1);
                const B = time * 0.0015 + smoothScrollY * 0.001;
                const centerX = canvas.width * (0.5 + dConfig.xOff) + mouse.x * 60 * dConfig.speed;
                // Vertical parallax position
                const centerY = (canvas.height * dConfig.yOff - smoothScrollY * dConfig.speed + canvas.height * 2) % (canvas.height * 2) - canvas.height/2;
                const scale = Math.min(canvas.width, canvas.height) * dConfig.scale;

                const cA = Math.cos(A), sA = Math.sin(A);
                const cB = Math.cos(B), sB = Math.sin(B);

                ctx.font = `${8 + dIdx * 2}px monospace`;
                ctx.fillStyle = `rgba(255, 255, 255, ${dConfig.alpha})`;

                for (let j = 0; j < Math.PI * 2; j += 0.35) {
                    const ct = Math.cos(j), st = Math.sin(j);
                    for (let i = 0; i < Math.PI * 2; i += 0.15) {
                        const sp = Math.sin(i), cp = Math.cos(i);
                        const h = ct + 2;
                        const D = 1 / (sp * h * sA + st * cA + 5);
                        const t = sp * h * cA - st * sA;
                        const x = centerX + scale * D * (cp * h * cB - t * sB);
                        const y = centerY + scale * D * (cp * h * sB + t * cB);
                        const N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                        if (N > 0 && x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
                            ctx.fillText('.,-~:;=!*#$@'[N], x, y);
                        }
                    }
                }
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, [mouse, stars, orbs]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParallaxBackground;
