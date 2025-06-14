import React, { useRef, useEffect, useState } from 'react';
import './HeartAnimation.css';

const HeartAnimation = () => {
  const canvasRef = useRef(null);
  const [showText, setShowText] = useState(false);

  const drawFrame = (ctx, a) => {
    const pi = Math.PI;
    const e = Math.E;
    const xVals = [], yVals = [];
    const scale = 80;

    for (let i = 0; i <= 1000; i++) {
      const x = -Math.sqrt(pi) + (2 * Math.sqrt(pi) * i) / 1000;
      const yPart = pi - x * x;
      if (yPart < 0) continue;
      const y = Math.pow(x * x, 1 / 3) + (e / 3) * Math.sqrt(yPart) * Math.sin(a * pi * x);
      xVals.push(x);
      yVals.push(y);
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < xVals.length; i++) {
      const x = xVals[i], y = yVals[i];
      const canvasX = ctx.canvas.width / 2 + x * scale;
      const canvasY = ctx.canvas.height / 2 - y * scale;
      if (i === 0) ctx.moveTo(canvasX, canvasY);
      else ctx.lineTo(canvasX, canvasY);
    }

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const totalFrames = 150; // 5s * 50fps = 250 frames
    const interval = setInterval(() => {
      const a = (frame / totalFrames) * 6; // a từ 0 đến 6 trong 5s
      drawFrame(ctx, a);

      // Hiện chữ khi a gần 3
      if (Math.abs(a - 3) < 0.05) {
        setShowText(true);
        setTimeout(() => setShowText(false), 2000);
      }

      frame = (frame + 1) % totalFrames;
    }, 20); // 50fps

    return () => clearInterval(interval);
  }, []);

  // Trái tim bay khắp màn hình
 useEffect(() => {
  const createFloatingIcon = () => {
    // Tỉ lệ: 2 trái tim 💖 : 1 chó 🐶 : 1 thỏ 🐰
    const icons = ['💖', '💖','💖', '🐶', '🐰'];
    const icon = icons[Math.floor(Math.random() * icons.length)];

    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.innerText = icon;

    // Tăng kích thước thêm 4px
    const size = Math.random() * 10 + 14; // 14 → 24px
    el.style.fontSize = `${size}px`;

    // Tăng tốc độ bay (bay nhanh hơn)
    el.style.animationDuration = `${Math.random() * 1.5 + 2.0}s`; // 2 → 3.5s

    el.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(el);

    el.addEventListener('animationend', () => el.remove());
  };

  // ⚡ Tăng mật độ bay: tạo icon mỗi 120ms (trước là 200ms)
  const interval = setInterval(createFloatingIcon, 120);

  return () => clearInterval(interval);
}, []);

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{
          display: 'block',
          margin: '0 auto',
          zIndex: 1,
        }}
      />

      {showText && (
        <div className="love-text">Yêu em 💗</div>
      )}
    </div>
  );
};

export default HeartAnimation;
