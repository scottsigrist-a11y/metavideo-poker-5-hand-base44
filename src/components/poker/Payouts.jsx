import React from 'react';
import { PAYTABLE } from '@/lib/poker';
export default function Payouts({ bet }) {
  return <div className="absolute inset-0 z-30 flex flex-col bg-blue-950 p-8 text-white">
    <h2 className="text-center text-3xl font-black text-yellow-300">JACKS OR BETTER</h2><p className="mb-5 text-center text-sm">9/6 Full Pay · Bet {bet}</p>
    <div className="flex-1 space-y-1">{PAYTABLE.map(([name, multiplier]) => <div key={name} className="flex justify-between border-b border-blue-700 px-4 py-2 text-lg"><b>{name}</b><span className="text-yellow-300">{multiplier * bet}</span></div>)}</div>
    <p className="text-center text-base font-bold text-yellow-200">Swipe up to return to game</p>
  </div>;
}