import React from 'react';
import PlayingCard from './PlayingCard';
export default function HandRow({ hand, held, main, focus, onCard, row = 0 }) {
  return <div className={`flex items-center justify-center gap-2 ${main ? 'mt-1' : ''}`}>
    {hand.map((card, i) => <PlayingCard key={card?.id || i} card={card} held={held[i]} compact={!main} active={main && focus?.type === 'card' && focus.index === i} onSelect={() => main && onCard(i)} delay={(row * 5 + i) * 22} />)}
  </div>;
}