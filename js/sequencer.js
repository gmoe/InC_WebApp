import work from 'webworkify';
import { state } from './model.js';
import clockWorker from './clock.worker.js';
import { Synth, Ostinato } from './synth.js';

const timer = work(clockWorker, state);

state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let nextOstinatoTime = state.audioCtx.currentTime;
let nextPulseTime = state.audioCtx.currentTime;
let endPhraseTime = state.audioCtx.currentTime;

const myOstinato = new Ostinato(state.audioCtx);

timer.addEventListener('message', (ev) => {
  while (nextOstinatoTime < state.audioCtx.currentTime + 0.5) {
    if (state.ostinatoOn) myOstinato.playNoteAt(nextOstinatoTime);
    nextOstinatoTime += state.secondsPerQuarterNote;
  }
});

const mySynth = new Synth(state.audioCtx);

const playPhrase = (phraseNumber, startTime) => {
  state.phrases[phraseNumber].notes.forEach(note =>
    mySynth.playNoteAt(startTime + note.time, note)
  );
  return startTime + state.phrases[phraseNumber].duration;
};

timer.addEventListener('message', (ev) => {
  while (nextPulseTime < state.audioCtx.currentTime + state.scheduleLookAhead) {
    console.log(`playbutton: ${state.playButtonPressed}`);
    console.log(`scheduled?: ${state.audioCtx.currentTime >= endPhraseTime}`);
    if (state.playButtonPressed && state.audioCtx.currentTime >= endPhraseTime) {
      console.log(`playing phrase at: ${nextPulseTime}`);
      endPhraseTime = playPhrase(state.currentPhrase, nextPulseTime);
      console.log(`end of phrase: ${endPhraseTime}`);
    }
    nextPulseTime += state.secondsPerEighthNote;
    console.log(`nextPulse: ${nextPulseTime}`);
  }
});

timer.postMessage(150);
