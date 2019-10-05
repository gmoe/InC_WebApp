import Vue from 'vue';
import Vuex from 'vuex';

import phrasesJSON from './phrases/phrases';
import ClockWorker from './clock.worker';
import { Synth, Ostinato } from './synth.js';
import * as util from './util';

Vue.use(Vuex);

const OCTAVE_MIN = -3;
const OCTAVE_MAX = 3;
const DEFAULT_BPM = 120;

const playPhrase = (phrase, startTime, synth) => {
  phrase.notes.forEach(note => synth.playNoteAt(startTime + note.time, note));
  return startTime + phrase.duration;
};

export default new Vuex.Store({
  state: {
    audioCtx: null,
    worker: null,
    bpm: DEFAULT_BPM,
    secondsPerQuarterNote: 60.0 / DEFAULT_BPM,
    ostinato: {
      on: false,
      nextTime: 0,
      synthNode: null,
    },
    instrument: {
      playButtonPressed: false,
      endPhraseTime: 0,
      nextTime: 0,
      octave: 0,
      synthNode: null,
    },
    currentPhraseIndex: 0,
    phrases: phrasesJSON.map(({ duration, notes }) => ({
      duration: util.parseTimeString(duration, DEFAULT_BPM),
      notes: notes.map((note) => ({
        ...note,
        frequency: util.midiToFrequency(note.midi),
        time: util.parseTimeString(note.time, DEFAULT_BPM),
        duration: util.parseTimeString(note.duration, DEFAULT_BPM),
      })),
    })),
  },

  mutations: {
    startAudio(state) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      state.audioCtx = audioCtx;
      state.ostinato.nextTime = audioCtx.currentTime;
      state.instrument.nextTime = state.audioCtx.currentTime;
      state.instrument.endPhraseTime = state.audioCtx.currentTime;

      state.ostinato.synthNode = new Ostinato(audioCtx);
      state.instrument.synthNode = new Synth(audioCtx);
    },
    registerWorker(state, worker) {
      state.worker = worker;
    },
    toggleOstinato(state) {
      state.ostinato.on = !state.ostinato.on;
    },
    playButtonPressed(state) {
      state.playButtonPressed = true;
    },
    playButtonReleased(state) {
      state.playButtonPressed = false;
    },
    nextPhrase(state) {
      if (state.currentPhraseIndex < state.phrases.length) {
        state.currentPhraseIndex += 1;
      }
    },
    previousPhrase(state) {
      if (state.currentPhraseIndex > 0) {
        state.currentPhraseIndex -= 1;
      }
    },
  },

  actions: {
    startClock({ dispatch, commit }) {
      const worker = new ClockWorker();
      worker.addEventListener('message', () => {
        dispatch('schedule');
      });
      worker.postMessage('poll');
      commit('registerWorker', worker);
    },
    schedule({ commit, state }) {
      const {
        audioCtx,
        currentPhraseIndex,
        instrument,
        ostinato,
        phrases,
        playButtonPressed,
        secondsPerQuarterNote,
      } = state;

      while (ostinato.nextTime < audioCtx.currentTime + secondsPerQuarterNote) {
        if (ostinato.on) ostinato.synthNode.playNoteAt(ostinato.nextTime);
        state.ostinato.nextTime += secondsPerQuarterNote;
      }

      while (instrument.nextTime < audioCtx.currentTime + 0.02) {
        if (playButtonPressed && audioCtx.currentTime >= instrument.endPhraseTime) {
          instrument.endPhraseTime = playPhrase(
            phrases[currentPhraseIndex],
            instrument.nextTime,
            instrument.synthNode
          );
          console.debug(`end time: ${instrument.endPhraseTime}`);
        }
        instrument.nextTime += secondsPerQuarterNote / 2.0;
        console.debug(`next pulse: ${instrument.nextTime}`);
      }
    },
  },
});
