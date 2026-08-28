import React from 'react';
const names = ['PAYOUTS', 'BET', 'DEAL'];
export default function GameControls({ focus, phase, bet, onAction }) {
  return <footer className="absolute inset-x-2 bottom-2 flex h-[88px] items-stretch justify-center gap-3">
    {names.map((name, i) => { const label = i === 1 ? `BET ${bet}` : i === 2 && phase === 'holding' ? 'DRAW' : name; const active = focus.type === 'control' && focus.index === i; return <button key={name} onClick={() => onAction(i)} className={`h-[88px] min-w-[116px] rounded-lg border-2 px-4 text-sm font-black tracking-wider shadow-lg transition-all ${active ? 'border-yellow-200 bg-yellow-300 text-blue-950 ring-4 ring-cyan-300/70 -translate-y-1' : 'border-blue-200 bg-gradient-to-b from-blue-500 to-blue-800 text-white opacity-80'}`}>{label}</button>; })}
  </footer>;
}