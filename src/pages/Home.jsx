import React from 'react';
import usePokerGame from '@/hooks/usePokerGame';
import useSwipeControls from '@/hooks/useSwipeControls';
import GameHeader from '@/components/poker/GameHeader';
import HandRow from '@/components/poker/HandRow';
import GameControls from '@/components/poker/GameControls';
import Payouts from '@/components/poker/Payouts';
import WinList from '@/components/poker/WinList';
import WinPopup from '@/components/poker/WinPopup';
export default function Home() {
  const game = usePokerGame(), gestures = useSwipeControls(game.move, game.activate, () => game.payoutsOpen && game.activate());
  const selectControl = i => { game.setFocus({ type: 'control', index: i }); if (game.focus.type === 'control' && game.focus.index === i) game.activate(); };
  const selectCard = i => { game.setFocus({ type: 'card', index: i }); if (game.focus.type === 'card' && game.focus.index === i) game.activate(); };
  return <main className="min-h-screen select-none bg-[#1C1E21] text-white touch-none" {...gestures}>
    <section className="relative mx-auto h-[600px] w-[600px] max-w-full overflow-hidden bg-[radial-gradient(circle_at_center,#1457a0_0%,#06265b_68%,#1C1E21_100%)] shadow-2xl">
      <GameHeader credits={game.credits} bet={game.bet} phase={game.phase} />
      {game.winners.length > 0 && <WinList winners={game.winners} />}
      <div className={`mt-3 space-y-1 ${game.winners.length ? 'ml-[145px]' : ''}`}>{game.hands.slice(1).map((hand, i) => <HandRow key={i} row={i} hand={hand} held={game.held} />)}<HandRow row={4} hand={game.hands[0]} held={game.held} main focus={game.focus} onCard={selectCard} /></div>
      <WinPopup total={game.roundWin} shown={game.displayWin} show={game.phase === 'result'} />
      <GameControls focus={game.focus} phase={game.phase} bet={game.bet} onAction={selectControl} />
      {game.payoutsOpen && <Payouts bet={game.bet} />}
    </section>
  </main>;
}