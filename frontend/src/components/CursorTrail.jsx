import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const addExplosion = (x, y) => {
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push({
          x,
          y,
          alpha: 1,
          radius: Math.random() * 4 + 1,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
        ctx.fill();
      }

      requestAnimationFrame(update);
    };

    const handleClick = (e) => {
      addExplosion(e.clientX, e.clientY);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
    update();

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const hexToRgb = (hslColor) => {
    const hsl = hslColor.match(/\d+/g);
    const [h, s, l] = hsl.map(Number);
    const a = s * Math.min(l / 100, 1 - l / 100) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return `${f(0)},${f(8)},${f(4)}`;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTrail;
