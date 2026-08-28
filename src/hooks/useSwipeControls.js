import { useEffect, useRef } from 'react';
export default function useSwipeControls(move, activate, back) {
  const start = useRef(null);
  useEffect(() => {
    const key = (e) => { const map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'down' }; if (map[e.key]) { e.preventDefault(); move(map[e.key]); } if (e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } if (e.key === 'Escape') { e.preventDefault(); back(); } };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [move, activate, back]);
  return {
    onPointerDown: e => { start.current = { x: e.clientX, y: e.clientY }; },
    onPointerUp: e => { if (!start.current) return; const dx = e.clientX - start.current.x, dy = e.clientY - start.current.y; start.current = null; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left'); else dy < 0 ? activate() : move('down'); },
  };
}