import React from 'react';
export default function GameHeader({ credits, bet, phase }) {
  return <header className="mx-2 mt-6 flex h-16 items-center justify-between border-b-2 border-yellow-400/50 px-4">
    <div><h1 className="text-xl font-black italic tracking-tight text-yellow-300">FIVE HAND</h1><p className="text-xs font-bold tracking-[.18em] text-white">JACKS OR BETTER</p></div>
    <div className="text-right text-xs text-blue-200"><p>CREDITS <b className="text-lg text-white">{credits}</b></p><p>BET {bet} × 5 · {phase === 'holding' ? 'CHOOSE HOLDS' : phase === 'result' ? 'ROUND COMPLETE' : 'READY'}</p></div>
  </header>;
}