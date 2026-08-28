import React from 'react';
export default function PlayingCard({ card, held, active, onSelect, compact = false, delay = 0 }) {
  const red = card && (card.suit === '♥' || card.suit === '♦');
  return <button onClick={onSelect} tabIndex={compact ? -1 : 0} style={{ animationDelay: `${delay}ms` }} className={`${card ? 'card-deal' : ''} ${compact ? 'h-[48px] w-[42px]' : 'h-[66px] w-[52px]'} relative rounded-md border-2 bg-white font-black shadow-md transition-all duration-150 ${active ? 'border-yellow-300 ring-4 ring-cyan-300/90 -translate-y-1' : 'border-slate-300 opacity-80'} ${red ? 'text-red-600' : 'text-slate-950'}`} aria-label={card ? `${card.rank} of ${card.suit}${held ? ', held' : ''}` : 'Empty card'}>
    {card ? <><span className={`${compact ? 'text-[12px]' : 'text-base'} absolute left-1 top-0.5 leading-none`}>{card.rank}</span><span className={`${compact ? 'text-xl' : 'text-2xl'} leading-none`}>{card.suit}</span>{held && <span className="absolute inset-x-0 bottom-0 rounded-b bg-yellow-300 py-0.5 text-[8px] tracking-wider text-slate-950">HELD</span>}</> : <span className="text-blue-900">★</span>}
  </button>;
}