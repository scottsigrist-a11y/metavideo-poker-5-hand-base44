import React from 'react';
export default function WinList({ winners }) {
  return <aside className="absolute left-3 top-[118px] w-[142px] space-y-1 text-left">
    {winners.map(item => <div key={item.name} className="rounded border border-yellow-400 bg-black/70 px-2 py-1 text-[10px] leading-tight text-yellow-200"><b>{item.name}</b><br />{item.count}× · {item.credits} credits</div>)}
  </aside>;
}