export const BETS = [1, 5, 10, 100, 500];
export const PAYTABLE = [
  ['Royal Flush', 800], ['Straight Flush', 50], ['Four of a Kind', 25],
  ['Full House', 9], ['Flush', 6], ['Straight', 4],
  ['Three of a Kind', 3], ['Two Pair', 2], ['Jacks or Better', 1],
];
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
export const newDeck = () => SUITS.flatMap((suit) => RANKS.map((rank, value) => ({ suit, rank, value: value + 2, id: `${rank}${suit}` })));
export const shuffle = (cards) => {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  return deck;
};
export const scoreHand = (cards) => {
  const values = cards.map(c => c.value).sort((a, b) => a - b);
  const counts = Object.values(values.reduce((a, v) => ({ ...a, [v]: (a[v] || 0) + 1 }), {})).sort((a, b) => b - a);
  const flush = cards.every(c => c.suit === cards[0].suit);
  const unique = [...new Set(values)];
  const straight = unique.length === 5 && (unique[4] - unique[0] === 4 || unique.join(',') === '2,3,4,5,14');
  if (flush && straight && values.includes(10) && values.includes(14)) return PAYTABLE[0];
  if (flush && straight) return PAYTABLE[1];
  if (counts[0] === 4) return PAYTABLE[2];
  if (counts[0] === 3 && counts[1] === 2) return PAYTABLE[3];
  if (flush) return PAYTABLE[4];
  if (straight) return PAYTABLE[5];
  if (counts[0] === 3) return PAYTABLE[6];
  if (counts[0] === 2 && counts[1] === 2) return PAYTABLE[7];
  const pair = values.find(v => values.filter(x => x === v).length === 2);
  return pair >= 11 ? PAYTABLE[8] : null;
};