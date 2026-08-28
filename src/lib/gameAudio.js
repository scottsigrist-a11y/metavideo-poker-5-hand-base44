let context;
const audio = () => context || (context = new (window.AudioContext || window.webkitAudioContext)());
const tone = (frequency, duration, type = 'sine', volume = .06, delay = 0) => {
  const ctx = audio(), oscillator = ctx.createOscillator(), gain = ctx.createGain();
  oscillator.type = type; oscillator.frequency.value = frequency; gain.gain.value = volume;
  oscillator.connect(gain); gain.connect(ctx.destination);
  oscillator.start(ctx.currentTime + delay); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + delay + duration);
  oscillator.stop(ctx.currentTime + delay + duration);
};
export const flipSound = (delay = 0) => { tone(180, .045, 'triangle', .035, delay); tone(95, .055, 'square', .018, delay + .025); };
export const winSound = () => { tone(740, .16, 'sine', .07); tone(990, .22, 'sine', .055, .1); };
export const creditSound = () => tone(1180, .035, 'sine', .035);