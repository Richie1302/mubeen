import React, { useState, useEffect, useRef } from 'react';

/**
 * Mubeen Ayomide Kolade Portfolio
 * Military-grade NOC Terminal Aesthetic
 * Version: 2.0 (React Port)
 */

const MubeenPortfolio = () => {
    // --- STATE ---
    const [logEntries, setLogEntries] = useState([]);
    const [logIdx, setLogIdx] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    // --- REFS ---
    const canvasRef = useRef(null);
    const radarAngleRef = useRef(0);
    const observerRef = useRef(null);

    // --- CONSTANTS ---
    const LOG_DATA = [
        { level: 'INFO', msg: 'User login: admin', color: 'var(--green2)' },
        { level: 'WARN', msg: 'High CPU on SRV-02', color: 'var(--amber)' },
        { level: 'INFO', msg: 'Backup completed OK', color: 'var(--green2)' },
        { level: 'ERROR', msg: 'VPN tunnel dropped', color: 'var(--red)' },
        { level: 'INFO', msg: 'Ticket #4821 opened', color: 'var(--green)' },
        { level: 'WARN', msg: 'Disk usage >80%', color: 'var(--amber)' },
        { level: 'INFO', msg: 'Patch applied: KB9921', color: 'var(--green2)' },
        { level: 'ERROR', msg: 'Firewall rule deny', color: 'var(--red)' },
        { level: 'INFO', msg: 'Port scan blocked', color: 'var(--green2)' },
        { level: 'INFO', msg: 'Switch SW-01 online', color: 'var(--green2)' },
        { level: 'WARN', msg: 'Memory leak detected', color: 'var(--amber)' },
        { level: 'INFO', msg: 'DNS resolved OK', color: 'var(--green2)' },
        { level: 'INFO', msg: 'NTP sync success', color: 'var(--green2)' },
        { level: 'ERROR', msg: 'Auth fail x3: 10.0.4', color: 'var(--red)' },
        { level: 'INFO', msg: 'Ticket #4822 closed', color: 'var(--green2)' }
    ];

    const BLIPS = [
        { label: 'FW-MAIN', angle: 0.6, radius: 0.52, color: '#00ffcc', alpha: 0 },
        { label: 'SW-01', angle: 1.8, radius: 0.38, color: '#00ff41', alpha: 0 },
        { label: 'PC-14', angle: 2.5, radius: 0.68, color: '#00ff41', alpha: 0 },
        { label: 'SRV-02', angle: 3.4, radius: 0.55, color: '#00ff41', alpha: 0 },
        { label: 'AP-07', angle: 4.1, radius: 0.42, color: '#00ff41', alpha: 0 },
        { label: 'THREAT', angle: 1.1, radius: 0.30, color: '#ff3333', alpha: 0 },
        { label: 'WARN', angle: 5.2, radius: 0.60, color: '#ffaa00', alpha: 0 }
    ];

    // --- EFFECTS ---

    // 1. Inject Styles
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --bg:       #000a00;
                --bg2:      #020f02;
                --card:     #040f04;
                --border:   #0d2e0d;
                --border2:  #1a4a1a;
                --green:    #00ff41;
                --green2:   #00cc33;
                --green3:   #007a1f;
                --cyan:     #00ffcc;
                --amber:    #ffaa00;
                --red:      #ff3333;
                --text:     #d0f0d0;
                --muted:    #3a6b3a;
                --nav-height: 52px;
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @media (prefers-color-scheme: light) {
                :root {
                    --bg:       #f0fff0;
                    --bg2:      #e4f7e4;
                    --card:     #ffffff;
                    --border:   #b8deb8;
                    --border2:  #7ec87e;
                    --green:    #0a7c0a;
                    --green2:   #0d9e0d;
                    --green3:   #4ab84a;
                    --cyan:     #007755;
                    --amber:    #b87700;
                    --red:      #cc1111;
                    --text:     #1a3a1a;
                    --muted:    #5a8a5a;
                }
            }

            #mak-portfolio-root {
                background-color: var(--bg);
                color: var(--text);
                font-family: 'Source Sans 3', sans-serif;
                font-size: 18px;
                font-weight: 500;
                line-height: 1.6;
                overflow-x: hidden;
                position: relative;
            }

            #mak-portfolio-root::before {
                content: "";
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 3px);
                pointer-events: none;
                z-index: 9999;
            }

            .mak-mono { font-family: 'Share Tech Mono', monospace; }
            .mak-rajdhani { font-family: 'Rajdhani', sans-serif; text-transform: uppercase; }

            .fade-up {
                opacity: 0;
                transform: translateY(24px);
                transition: opacity 0.7s ease, transform 0.7s ease;
            }

            .fade-up.visible {
                opacity: 1;
                transform: translateY(0);
            }

            @keyframes blink { 50% { opacity: 0; } }
            .blink { animation: blink 1s step-end infinite; }

            @keyframes bobble {
                0%, 100% { transform: translate(-50%, 0); }
                50% { transform: translate(-50%, 10px); }
            }

            /* Utilities */
            .mak-section {
                padding: 80px 5%;
                border-bottom: 1px solid transparent;
                border-image: linear-gradient(90deg, var(--green3), transparent) 1;
            }

            .section-header { margin-bottom: 40px; }
            .section-header h2 { font-size: 2.5rem; margin-top: -5px; }

            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
            
            .about-image-container {
                position: relative;
                border: 2px solid var(--border2);
                padding: 10px;
                background: var(--bg2);
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.1);
                margin-bottom: 30px;
            }
            .about-image-container::before {
                content: ""; position: absolute; top: -5px; left: -5px; width: 20px; height: 20px;
                border-top: 2px solid var(--green); border-left: 2px solid var(--green);
            }
            .about-image-container::after {
                content: ""; position: absolute; bottom: -5px; right: -5px; width: 20px; height: 20px;
                border-bottom: 2px solid var(--green); border-right: 2px solid var(--green);
            }
            .about-img { width: 100%; display: block; filter: grayscale(0.2) contrast(1.1); }

            .stat-card {
                background: var(--card);
                border: 1px solid var(--border);
                padding: 24px;
                border-radius: 10px;
                transition: var(--transition);
            }
            .stat-card:hover {
                border-color: var(--green3);
                box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
            }

            .skill-badge {
                font-family: 'Share Tech Mono', monospace;
                font-size: 10px;
                color: var(--green);
                border: 1px solid var(--green3);
                background: rgba(0, 255, 65, 0.05);
                padding: 6px 14px;
                border-radius: 4px;
                transition: var(--transition);
            }
            .skill-badge:hover {
                border-color: var(--green);
                box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
            }

            .experience-card {
                background: var(--card);
                border: 1px solid var(--border);
                border-left: 3px solid var(--green3);
                border-radius: 0 10px 10px 0;
                padding: 25px;
                transition: var(--transition);
            }
            .experience-card:hover {
                border-left-color: var(--green);
                transform: translateX(4px);
            }

            .cert-card {
                background: var(--card);
                border: 1px solid var(--border);
                padding: 25px;
                border-radius: 10px;
                text-align: center;
                transition: var(--transition);
            }
            .cert-card:hover {
                border-color: var(--green3);
                transform: translateY(-3px);
                box-shadow: 0 0 20px rgba(0, 255, 65, 0.15);
            }

            .icon-svg {
                width: 32px;
                height: 32px;
                fill: none;
                stroke: var(--green);
                stroke-width: 1.5;
                margin-bottom: 12px;
            }

            .cv-btn {
                background: var(--green);
                color: var(--bg);
                padding: 6px 12px;
                border-radius: 4px;
                text-decoration: none;
                font-weight: bold;
                transition: var(--transition);
                font-size: 10px;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            .cv-btn:hover {
                background: var(--cyan);
                box-shadow: 0 0 10px var(--cyan);
                color: #000;
            }

            @media (max-width: 900px) {
                .hero-side-panel { display: none; }
                .hero-grid { grid-template-columns: 1fr !important; }
                .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
            }

            @media (max-width: 768px) {
                #mak-portfolio-root { font-size: 16px; }
                .nav-links { display: none; }
                .desktop-only { display: none; }
                .mak-section { padding: 60px 5% !important; }
                .section-header h2 { font-size: 2rem !important; }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // 2. System Log Feed
    useEffect(() => {
        const timer = setTimeout(() => {
            const entry = {
                ...LOG_DATA[logIdx],
                timestamp: new Date().toTimeString().split(' ')[0]
            };
            setLogEntries(prev => [entry, ...prev].slice(0, 15));
            setLogIdx(prev => (prev + 1) % LOG_DATA.length);
        }, 900);
        return () => clearTimeout(timer);
    }, [logIdx]);

    // 3. Radar Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        let accentGreen, mutedGreen, cyanCol, trailBase, ringColor;

        const updateThemeColors = () => {
            const styles = getComputedStyle(document.documentElement);
            accentGreen = styles.getPropertyValue('--green').trim();
            mutedGreen = styles.getPropertyValue('--green3').trim();
            cyanCol = styles.getPropertyValue('--cyan').trim();
            isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            ringColor = isLight ? 'rgba(10, 124, 10, 0.2)' : 'rgba(0, 180, 50, 0.18)';
            trailBase = isLight ? '10, 124, 10' : '0, 255, 65';
        };
        updateThemeColors();

        const themeListener = (e) => updateThemeColors();
        const mql = window.matchMedia('(prefers-color-scheme: light)');
        mql.addEventListener('change', themeListener);

        const resize = () => {
            const size = Math.min(canvas.parentElement.offsetWidth - 40, 560);
            canvas.width = size;
            canvas.height = size;
        };
        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;
            const r = (w / 2) * 0.85;

            ctx.clearRect(0, 0, w, h);

            // 1. Radial background
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            grad.addColorStop(0, `rgba(${trailBase}, 0.05)`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();

            // 2. Rings
            ctx.strokeStyle = ringColor;
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, (r / 5) * i, 0, Math.PI * 2);
                ctx.stroke();
            }

            // 3. Sweep
            const angle = radarAngleRef.current;
            for (let i = 0; i < 60; i++) {
                const trailAngle = angle - (i * 0.015);
                const opacity = (0.35 * (1 - i / 60)).toFixed(3);
                ctx.fillStyle = `rgba(${trailBase}, ${opacity})`;
                ctx.beginPath(); ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, trailAngle, trailAngle + 0.02);
                ctx.fill();
            }

            ctx.strokeStyle = accentGreen;
            ctx.shadowBlur = 10; ctx.shadowColor = accentGreen;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
            ctx.stroke();
            ctx.shadowBlur = 0;

            // 4. Blips
            BLIPS.forEach(blip => {
                const diff = (angle - blip.angle + Math.PI * 2) % (Math.PI * 2);
                if (diff < 0.08) blip.alpha = 1;
                if (blip.alpha > 0) {
                    const bx = cx + (r * blip.radius) * Math.cos(blip.angle);
                    const by = cy + (r * blip.radius) * Math.sin(blip.angle);
                    ctx.fillStyle = blip.color; ctx.globalAlpha = blip.alpha;
                    ctx.beginPath(); ctx.arc(bx, by, 5, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = 1;
                    blip.alpha -= 0.004;
                }
            });

            // 5. Center Glow
            ctx.fillStyle = cyanCol;
            ctx.shadowBlur = 10; ctx.shadowColor = cyanCol;
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;

            radarAngleRef.current += 0.015;
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            mql.removeEventListener('change', themeListener);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // 4. Intersection Observer
    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.12 });

        const targets = document.querySelectorAll('.fade-up');
        targets.forEach(t => observerRef.current.observe(t));

        return () => observerRef.current.disconnect();
    }, [logEntries]); // Re-observe if entries change (though they are in hero mostly)

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('TRANSMITTING...');
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setSubmitStatus('MESSAGE SENT');
                const now = new Date();
                const ts = now.toTimeString().split(' ')[0];
                setLogEntries(prev => [
                    { 
                        level: 'INFO', 
                        msg: 'Message transmitted successfully', 
                        color: 'var(--cyan)',
                        timestamp: ts
                    }, 
                    ...prev.slice(0, 14)
                ]);
                e.target.reset();
            } else {
                throw new Error();
            }
        } catch (err) {
            setSubmitStatus('RETRY SEND');
            setIsSubmitting(false);
        }
    };

    // --- RENDER ---
    return (
        <div id="mak-portfolio-root">
            {/* Nav */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: 'var(--nav-height)',
                background: 'rgba(2, 15, 2, 0.95)', backdropFilter: 'blur(15px)',
                borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '0 5%', zIndex: 1000
            }}>
                <a href="#" className="nav-logo mak-mono" style={{ color: 'var(--green)', textDecoration: 'none', letterSpacing: '0.15em', fontWeight: 700, fontSize: '1.2rem' }}>MUBEEN // CORE_OPS</a>
                <div className="nav-links mak-mono" style={{ display: 'flex', gap: '24px', fontSize: '11px', alignItems: 'center', fontWeight: 600 }}>
                    <a href="#hero" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</a>
                    <a href="#about" style={{ color: 'var(--muted)', textDecoration: 'none' }}>About</a>
                    <a href="#skills" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Skills</a>
                    <a href="#experience" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Experience</a>
                    <a href="#certs" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Certs</a>
                    <a href="#education" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Education</a>
                    <a href="#contact" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Contact</a>
                    <a href="#" className="cv-btn">CV</a>
                </div>
            </nav>

            {/* Hero */}
            <section id="hero" style={{ height: '100vh', paddingTop: 'var(--nav-height)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <h1 className="mak-rajdhani" style={{ color: 'var(--green)', fontSize: 'clamp(20px, 5vw, 38px)', letterSpacing: '0.2em', textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}>IT Support Analyst</h1>
                    <p className="mak-mono" style={{ color: 'var(--green3)', fontSize: 'clamp(9px, 2vw, 13px)', letterSpacing: '0.15em' }}>[ NETWORK OPERATIONS CENTER — ACTIVE SCAN ]</p>
                </div>

                <div className="hero-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr 220px', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
                    {/* Left Panel */}
                    <aside className="hero-side-panel" style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                        <div className="mak-mono" style={{ fontSize: '10px', color: 'var(--green)', padding: '10px', background: 'rgba(0, 255, 65, 0.05)', borderBottom: '1px solid var(--border)' }}>{'>'} SYSTEM LOG</div>
                        <div className="mak-mono" style={{ fontSize: '9px', padding: '10px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {logEntries.map((log, i) => (
                                <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                                    <span style={{ color: log.color }}>[{log.level}]</span> <span style={{ color: 'var(--muted)' }}>{log.timestamp} {log.msg}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '0 10px 10px 10px' }}><span className="blink" style={{ display: 'inline-block', width: '6px', height: '12px', background: 'var(--green)' }}></span></div>
                    </aside>

                    {/* Center Radar */}
                    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid var(--border)' }}>
                        <canvas ref={canvasRef}></canvas>
                        <a href="#about" className="mak-mono" style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none', color: 'var(--green3)', fontSize: '10px', textAlign: 'center', animation: 'bobble 2s ease-in-out infinite' }}>
                            SCROLL TO EXPLORE<br />↓
                        </a>
                    </main>

                    {/* Right Panel */}
                    <aside className="hero-side-panel" style={{ borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                        <div className="mak-mono" style={{ fontSize: '10px', color: 'var(--green)', padding: '10px', background: 'rgba(0, 255, 65, 0.05)', borderBottom: '1px solid var(--border)' }}>{'>'} ACTIVE TICKETS</div>
                        <div className="mak-mono" style={{ padding: '10px', flex: 1, borderBottom: '1px solid var(--border)', fontSize: '9px' }}>
                            {[
                                { id: '#4821', p: 'CRIT', d: 'VPN timeout', c: '#ff3333' },
                                { id: '#4822', p: 'LOW', d: 'Printer offline', c: '#00cc33' },
                                { id: '#4823', p: 'MED', d: 'Email sync fail', c: '#ffaa00' },
                                { id: '#4824', p: 'LOW', d: 'RAM upgrade', c: '#00ffcc' },
                                { id: '#4825', p: 'HIGH', d: 'FW rule conflict', c: '#ff3333' }
                            ].map(t => (
                                <div key={t.id} style={{ marginBottom: '12px', borderLeft: `3px solid ${t.c}`, paddingLeft: '8px' }}>
                                    <div style={{ color: t.c, fontWeight: 'bold' }}>{t.id} [{t.p}]</div>
                                    <div style={{ color: 'var(--muted)', fontSize: '8px' }}>{t.d}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mak-mono" style={{ fontSize: '10px', color: 'var(--green)', padding: '10px', background: 'rgba(0, 255, 65, 0.05)', borderBottom: '1px solid var(--border)' }}>{'>'} NET STATISTICS</div>
                        <div className="mak-mono" style={{ padding: '10px', flex: 1, fontSize: '9px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>LATENCY</span> <span style={{ color: 'var(--green2)' }}>12ms</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>PACKET LOSS</span> <span style={{ color: 'var(--amber)' }}>0.3%</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>UPTIME</span> <span style={{ color: 'var(--green2)' }}>99.97%</span></div>
                        </div>
                    </aside>
                </div>

                {/* Status Bar */}
                <div className="mak-mono" style={{ height: '38px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: '9px', justifyContent: 'space-between' }}>
                    <div>STATUS: <span style={{ color: 'var(--green)' }}>ALL SYSTEMS OPERATIONAL</span></div>
                    <div className="desktop-only">TICKETS: <span style={{ color: 'var(--amber)' }}>5 OPEN | 12 RESOLVED TODAY</span></div>
                    <div>ANALYST: <span style={{ color: 'var(--green)' }}>ONLINE</span></div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="mak-section">
                <div className="section-header fade-up">
                    <div className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px' }}>// 01_OVERVIEW</div>
                    <h2 className="mak-rajdhani">About Me</h2>
                </div>
                <div className="grid-2" style={{ gap: '60px', alignItems: 'start' }}>
                    <div className="fade-up">
                        <div className="about-image-container">
                            <img src="selfie.jpeg" alt="Mubeen Ayomide Kolade" className="about-img" />
                        </div>
                    </div>
                    <div className="fade-up">
                        <p style={{ marginBottom: '20px', fontSize: '1.1rem', lineHeight: 1.7 }}>I am <strong>Mubeen Ayomide Kolade</strong>, a dynamic IT professional with a BSc in Cyber Security from Caleb University, Lagos. I specialize in troubleshooting complex IT issues, network maintenance, and cloud computing.</p>
                        <p style={{ marginBottom: '25px', fontSize: '1.1rem', lineHeight: 1.7 }}>My technical journey is backed by a CompTIA IT Fundamentals (ITF+) certification and hands-on experience with Microsoft 365, Ethical Hacking, and Network Security.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            {[
                                { i: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></>, l: 'DEGREE', v: 'BSc Cyber Security' },
                                { i: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, l: 'LOCATION', v: 'Essex, UK' },
                                { i: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>, l: 'EXP', v: '2+ Years IT' },
                                { i: <><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></>, l: 'CERT', v: 'CompTIA ITF+' }
                            ].map((s, idx) => (
                                <div key={idx} className="stat-card">
                                    <svg className="icon-svg" viewBox="0 0 24 24" style={{ width: '24px', height: '24px', marginBottom: '8px' }}>{s.i}</svg>
                                    <div className="mak-mono" style={{ fontSize: '10px', color: 'var(--muted)' }}>{s.l}</div>
                                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{s.v}</div>
                                </div>
                            ))}
                        </div>

                        <a href="#" className="cv-btn" style={{ padding: '15px 32px', fontSize: '14px', fontWeight: 700 }}>[ DOWNLOAD FULL CV / PDF ]</a>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="mak-section">
                <div className="section-header fade-up">
                    <div className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px' }}>// 02_CAPABILITIES</div>
                    <h2 className="mak-rajdhani">Technical Skills</h2>
                </div>
                <div className="grid-2">
                    <div className="fade-up">
                        <h3 className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>// TECHNICAL STACK</h3>
                        <div style={{ display: 'flex', wrap: 'wrap', gap: '10px', flexWrap: 'wrap' }}>
                            {['IT Support', 'Troubleshooting', 'Networking', 'Security', 'Cloud Computing', 'Microsoft 365', 'Hardware'].map(s => (
                                <span key={s} className="skill-badge">{s}</span>
                            ))}
                        </div>
                    </div>
                    <div className="fade-up">
                        <h3 className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>// CORE COMPETENCIES</h3>
                        <div style={{ display: 'flex', wrap: 'wrap', gap: '10px', flexWrap: 'wrap' }}>
                            {['Communication', 'Problem Solving', 'Multitasking', 'Documentation', 'Customer Support'].map(s => (
                                <span key={s} className="skill-badge">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="experience" className="mak-section">
                <div className="section-header fade-up">
                    <div className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px' }}>// 03_HISTORY</div>
                    <h2 className="mak-rajdhani">Work Experience</h2>
                </div>
                <div style={{ position: 'relative', paddingLeft: '30px', borderLeft: '1px solid var(--green3)' }}>
                    <div className="timeline-item">
                        <div style={{ position: 'absolute', left: '-35.5px', top: '5px', width: '10px', height: '10px', background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 10px var(--green)' }}></div>
                        <div className="experience-card fade-up">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 className="mak-rajdhani" style={{ fontSize: '1.25rem' }}>INFRATECH SUPPORT</h4>
                                    <div className="mak-mono" style={{ color: 'var(--cyan)', fontSize: '14px', margin: '5px 0 15px 0' }}>{'>'} ROLE: IT Support Analyst (Internship)</div>
                                </div>
                                <div className="mak-mono" style={{ color: 'var(--amber)', fontSize: '12px' }}>FEB 2026 — PRESENT</div>
                            </div>
                            <ul style={{ listStyle: 'none' }}>
                                {[
                                    'Network infrastructure monitoring and maintenance',
                                    'Hardware/Software troubleshooting and support',
                                    'Microsoft 365 administration and user management',
                                    'Technical documentation and internal support'
                                ].map(d => (
                                    <li key={d} style={{ marginBottom: '5px' }}><span className="mak-mono" style={{ color: 'var(--green3)', marginRight: '10px' }}>{'>'}</span>{d}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="timeline-item" style={{ marginTop: '40px' }}>
                        <div style={{ position: 'absolute', left: '-35.5px', top: '5px', width: '10px', height: '10px', background: 'var(--border2)', borderRadius: '50%' }}></div>
                        <div className="experience-card fade-up">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 className="mak-rajdhani" style={{ fontSize: '1.25rem' }}>LERA HEALTHCARE LIMITED</h4>
                                    <div className="mak-mono" style={{ color: 'var(--cyan)', fontSize: '14px', margin: '5px 0 15px 0' }}>{'>'} ROLE: Healthcare Assistant</div>
                                </div>
                                <div className="mak-mono" style={{ color: 'var(--amber)', fontSize: '12px' }}>NOV 2025 — PRESENT</div>
                            </div>
                            <ul style={{ listStyle: 'none' }}>
                                {['Mobility and physical support', 'Personal care and hygiene', 'Admin task management', 'Health monitoring'].map(d => (
                                    <li key={d} style={{ marginBottom: '5px' }}><span className="mak-mono" style={{ color: 'var(--green3)', marginRight: '10px' }}>{'>'}</span>{d}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section id="certs" className="mak-section">
                <div className="section-header fade-up">
                    <div className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px' }}>// 04_RECOGNITION</div>
                    <h2 className="mak-rajdhani">Certifications</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {[
                        { i: <><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" /></>, n: 'Intro to Databases & Dev' },
                        { i: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />, n: 'Microsoft 365 Introduction' },
                        { i: <path d="M12 1v22M5 12h14M2 17l10 5 10-5M2 7l10 5 10-5" />, n: 'Networking & Security' },
                        { i: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>, n: 'IT Fundamentals (ITF+)' },
                        { i: <><path d="M17.5 19c.7 0 1.2-.6 1.2-1.2V6.2c0-.7-.5-1.2-1.2-1.2h-11c-.7 0-1.2.5-1.2 1.2v11.6c0 .6.5 1.2 1.2 1.2h11z" /><circle cx="12" cy="12" r="3" /></>, n: 'Cloud Computing Fund.' },
                        { i: <><path d="M12 15l-2 5h4l-2-5z" /><circle cx="12" cy="9" r="6" /><path d="M9 21.5c-4.5-1-4.5-4-4.5-4" /></>, n: 'CompTIA Computer Basics' }
                    ].map(c => (
                        <div key={c.n} className="cert-card fade-up">
                            <svg className="icon-svg" viewBox="0 0 24 24" style={{ marginBottom: '15px' }}>{c.i}</svg>
                            <h5 style={{ fontSize: '14px', marginBottom: '10px' }}>{c.n}</h5>
                            <div className="mak-mono" style={{ fontSize: '9px', color: 'var(--muted)' }}>CUL / COMPTIA</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section id="education" className="mak-section">
                <div className="section-header fade-up">
                    <div className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px' }}>// 05_ACADEMIA</div>
                    <h2 className="mak-rajdhani">Education</h2>
                </div>
                <div className="grid-2">
                    <div className="stat-card fade-up">
                        <svg className="icon-svg" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>
                        <h4 className="mak-rajdhani">BSc. Cyber Security</h4>
                        <div className="mak-mono" style={{ color: 'var(--green)', marginBottom: '10px' }}>CALEB UNIVERSITY</div>
                        <div className="mak-mono" style={{ fontSize: '11px', color: 'var(--muted)' }}>2022 | LAGOS, NIGERIA</div>
                    </div>
                    <div className="stat-card fade-up">
                        <svg className="icon-svg" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                        <h4 className="mak-rajdhani">WASSCE Certificate</h4>
                        <div className="mak-mono" style={{ color: 'var(--green)', marginBottom: '10px' }}>FRONTRUNNER COLLEGE</div>
                        <div className="mak-mono" style={{ fontSize: '11px', color: 'var(--muted)' }}>2017 — 2022</div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="mak-section">
                <div className="section-header fade-up">
                    <div className="mak-mono" style={{ color: 'var(--green)', fontSize: '14px' }}>// 06_COMMUNICATION</div>
                    <h2 className="mak-rajdhani">Get In Touch</h2>
                </div>
                <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <a href="mailto:kolademubeen04@gmail.com" className="stat-card fade-up" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <svg className="icon-svg" style={{ width: '20px', height: '20px', marginBottom: 0 }} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <div style={{ color: 'var(--green)' }}>kolademubeen04@gmail.com</div>
                        </a>
                        <a href="tel:+447491474676" className="stat-card fade-up" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <svg className="icon-svg" style={{ width: '20px', height: '20px', marginBottom: 0 }} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            <div style={{ color: 'var(--green)' }}>+44 7491 474676</div>
                        </a>
                        <div className="stat-card fade-up" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <svg className="icon-svg" style={{ width: '20px', height: '20px', marginBottom: 0 }} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            <div style={{ color: 'var(--text)' }}>Basildon, Essex SS14 3RA</div>
                        </div>
                        <a href="https://www.linkedin.com/in/mubeen-kolade-6773423b9" target="_blank" className="stat-card fade-up" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <svg className="icon-svg" style={{ width: '20px', height: '20px', marginBottom: 0 }} viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            <div style={{ color: 'var(--green)' }}>mubeen-kolade-6773423b9</div>
                        </a>
                    </div>
                    <div className="stat-card fade-up" style={{ padding: '30px' }}>
                        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Environment Variable Support (Vite/CRA) */}
                            <input 
                                type="hidden" 
                                name="accessKey" 
                                value={
                                    process.env.REACT_APP_STATICFORMS_KEY || 
                                    (import.meta.env && import.meta.env.VITE_STATICFORMS_KEY) || 
                                    "sf_3189bc2ae28ac8698509f32d"
                                } 
                            />
                            <input type="hidden" name="replyTo" value="@" />
                            <input type="text" name="name" placeholder="NAME" required style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Share Tech Mono' }} />
                            <input type="email" name="email" placeholder="EMAIL" required style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Share Tech Mono' }} />
                            <textarea name="message" placeholder="MESSAGE" rows="4" required style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Share Tech Mono' }}></textarea>
                            <button type="submit" disabled={isSubmitting} className="mak-mono" style={{ background: 'transparent', border: '1px solid var(--green3)', color: 'var(--green)', padding: '12px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                                {submitStatus || '>_ SEND MESSAGE'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mak-mono" style={{ padding: '28px 5%', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', background: 'var(--bg2)' }}>
                <div>Designed & built for <span style={{ color: 'var(--green)', fontWeight: 'bold' }}>Mubeen Ayomide Kolade</span></div>
                <div className="desktop-only">{'>'} Built with purpose. <span style={{ color: 'var(--green)' }}>Shipped with pride.</span></div>
            </footer>
        </div>
    );
};

export default MubeenPortfolio;
