import { useEffect, useRef, useState } from 'react';
import { BETS, newDeck, shuffle, scoreHand } from '@/lib/poker';
import { creditSound, flipSound, winSound } from '@/lib/gameAudio';
const emptyHands = () => Array.from({ length: 5 }, () => Array(5).fill(null));
export default function usePokerGame() {
  const [phase, setPhase] = useState('ready'), [hands, setHands] = useState(emptyHands), [held, setHeld] = useState(Array(5).fill(false));
  const [betIndex, setBetIndex] = useState(1), [credits, setCredits] = useState(() => Number(localStorage.getItem('vp-credits')) || 10000);
  const [focus, setFocus] = useState({ type: 'control', index: 2 }), [winners, setWinners] = useState([]), [roundWin, setRoundWin] = useState(0);
  const [displayWin, setDisplayWin] = useState(0), [payoutsOpen, setPayoutsOpen] = useState(false), timer = useRef();
  const bet = BETS[betIndex];
  useEffect(() => { localStorage.setItem('vp-credits', credits); }, [credits]);
  useEffect(() => () => clearInterval(timer.current), []);
  const deal = () => {
    clearInterval(timer.current); const base = shuffle(newDeck()).slice(0, 5);
    setHands(Array.from({ length: 5 }, () => base.map(card => ({ ...card })))); setHeld(Array(5).fill(false));
    setCredits(c => Math.max(0, c - bet * 5)); setWinners([]); setRoundWin(0); setDisplayWin(0); setPhase('holding'); setFocus({ type: 'card', index: 0 });
    Array.from({ length: 25 }, (_, i) => flipSound(i * .022));
  };
  const draw = () => {
    const initial = hands[0], blocked = new Set(initial.map(c => c.id));
    const final = hands.map(() => { const deck = shuffle(newDeck().filter(c => !blocked.has(c.id))); let n = 0; return initial.map((c, i) => held[i] ? c : deck[n++]); });
    setHands(final); final.forEach((hand, row) => hand.forEach((_, col) => !held[col] && flipSound((row * 5 + col) * .022)));
    const results = final.map(scoreHand).filter(Boolean), grouped = Object.values(results.reduce((a, [name, mult]) => ({ ...a, [name]: { name, count: (a[name]?.count || 0) + 1, credits: (a[name]?.credits || 0) + mult * bet } }), {}));
    const total = grouped.reduce((sum, item) => sum + item.credits, 0); setWinners(grouped); setRoundWin(total); setCredits(c => c + total); setPhase('result'); setFocus({ type: 'control', index: 2 });
    if (total) { winSound(); let shown = 0, step = Math.max(1, Math.ceil(total / 80)); timer.current = setInterval(() => { shown = Math.min(total, shown + step); setDisplayWin(shown); creditSound(); if (shown === total) clearInterval(timer.current); }, 35); }
  };
  const activate = () => {
    if (payoutsOpen) return setPayoutsOpen(false);
    if (focus.type === 'card') return setHeld(h => h.map((v, i) => i === focus.index ? !v : v));
    if (focus.index === 0) return setPayoutsOpen(true);
    if (focus.index === 1 && phase !== 'holding') return setBetIndex(i => (i + 1) % BETS.length);
    if (focus.index === 2) return phase === 'holding' ? draw() : deal();
  };
  const move = (direction) => {
    if (payoutsOpen) return;
    if (direction === 'down') return setFocus(f => f.type === 'card' ? { type: 'control', index: 2 } : phase === 'holding' && f.index === 2 ? { type: 'card', index: 0 } : f);
    setFocus(f => ({ ...f, index: (f.index + (direction === 'right' ? 1 : -1) + (f.type === 'card' ? 5 : 3)) % (f.type === 'card' ? 5 : 3) }));
  };
  return { phase, hands, held, bet, credits, focus, winners, roundWin, displayWin, payoutsOpen, activate, move, setFocus };
}