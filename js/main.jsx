import { h, app } from 'hyperapp';
import { state, actions } from './model.js';
import OctaveControl from './ui/OctaveControl.jsx';
import PlaybackControl from './ui/PlaybackControl.jsx';
import './sequencer.js';

app(
  state,
  actions,
  () => (
    <div id="app">
      <h1>LUTE: inC</h1>
      <PlaybackControl />
      <OctaveControl />
    </div>
  ),
  document.body
);
