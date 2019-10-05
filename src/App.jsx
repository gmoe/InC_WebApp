import Playback from './components/Playback';
import Score from './components/Score';

export default {
  name: 'app',
  render() {
    return (
      <div id="app">
        <Score
          currentPhraseIndex={this.$store.state.currentPhraseIndex}
          octave={this.$store.state.instrument.octave}
        />
        <Playback />
      </div>
    );
  },
};
