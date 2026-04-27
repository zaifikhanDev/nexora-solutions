import { useEffect, useRef, useState } from 'react';

const AsciiCube = () => {
    const preRef = useRef<HTMLPreElement>(null);
    const [dimensions, setDimensions] = useState({ cols: 80, rows: 40 });

    useEffect(() => {
        const updateDimensions = () => {
            const cols = Math.floor(window.innerWidth / 12);
            const rows = Math.floor(window.innerHeight / 20);
            setDimensions({ cols, rows });
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const density = ' .:-=+*#%@';

        // 3D Math Helpers
        const vec3 = (x: number, y: number, z: number) => ({ x, y, z });
        const vec2 = (x: number, y: number) => ({ x, y });

        const rotX = (v: any, a: number) => {
            const c = Math.cos(a), s = Math.sin(a);
            return vec3(v.x, v.y * c - v.z * s, v.y * s + v.z * c);
        };
        const rotY = (v: any, a: number) => {
            const c = Math.cos(a), s = Math.sin(a);
            return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
        };
        const rotZ = (v: any, a: number) => {
            const c = Math.cos(a), s = Math.sin(a);
            return vec3(v.x * c - v.y * s, v.x * s + v.y * c, v.z);
        };

        const sdSegment = (p: any, a: any, b: any, thickness: number) => {
            const pa = { x: p.x - a.x, y: p.y - a.y };
            const ba = { x: b.x - a.x, y: b.y - a.y };
            const h = Math.min(Math.max((pa.x * ba.x + pa.y * ba.y) / (ba.x * ba.x + ba.y * ba.y), 0), 1);
            const dx = pa.x - ba.x * h;
            const dy = pa.y - ba.y * h;
            return Math.sqrt(dx * dx + dy * dy) - thickness;
        };

        const l = 0.8;
        const vertices = [
            vec3(l, l, l), vec3(-l, l, l), vec3(-l, -l, l), vec3(l, -l, l),
            vec3(l, l, -l), vec3(-l, l, -l), vec3(-l, -l, -l), vec3(l, -l, -l)
        ];
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        let frame = 0;
        const render = () => {
            if (!preRef.current) return;
            const t = frame * 0.05;
            const rot = { x: t * 0.3, y: t * 0.5, z: t * 0.2 };
            const d = 2.5;
            const zOffs = 4.5;

            const projected = vertices.map(v => {
                let vt = rotX(v, rot.x);
                vt = rotY(vt, rot.y);
                vt = rotZ(vt, rot.z);
                const scale = d / (vt.z + zOffs);
                return vec2(vt.x * scale, vt.y * scale);
            });

            let output = "";
            for (let y = 0; y < dimensions.rows; y++) {
                for (let x = 0; x < dimensions.cols; x++) {
                    const st = {
                        x: (x / dimensions.cols - 0.5) * 4 * (dimensions.cols / dimensions.rows) * 0.5,
                        y: (y / dimensions.rows - 0.5) * 4
                    };

                    let dist = 1e10;
                    edges.forEach(edge => {
                        dist = Math.min(dist, sdSegment(st, projected[edge[0]], projected[edge[1]], 0.05));
                    });

                    const charIdx = Math.floor(Math.max(0, Math.min(1, 1.0 - dist * 4)) * (density.length - 1));
                    output += dist < 0.1 ? density[charIdx] : " ";
                }
                output += "\n";
            }

            preRef.current.textContent = output;
            frame++;
            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animId);
    }, [dimensions]);

    return (
        <pre
            ref={preRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                fontSize: '12px',
                lineHeight: '18px',
                color: 'rgba(255, 255, 255, 0.8)',
                opacity: 0.15,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
                fontFamily: 'monospace',
                whiteSpace: 'pre',
            }}
        />
    );
};

export default AsciiCube;
