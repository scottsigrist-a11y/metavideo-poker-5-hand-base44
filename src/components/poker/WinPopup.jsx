import React from 'react';
export default function WinPopup({ total, shown, show }) {
  if (!show) return null;
  return <div className="absolute left-1/2 top-1/2 z-20 w-52 -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-yellow-300 bg-blue-950/95 p-4 text-center shadow-2xl">
    <p className="text-xs font-bold tracking-[.2em] text-blue-200">ROUND WIN</p><p className="mt-1 text-4xl font-black text-yellow-300">{shown}</p><p className="text-sm text-white">CREDITS</p>
  </div>;
}