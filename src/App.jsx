import Playback from './components/Playback';
import Score from './components/Score';
import SimpleScore from './components/SimpleScore';

export default {
  name: 'app',
  render() {
    return (
      <div id="app">
        <Score
          currentPhraseIndex={this.$store.state.currentPhraseIndex}
          octave={this.$store.state.instrument.octave}
        />
        <SimpleScore
          currentPhraseIndex={this.$store.state.currentPhraseIndex}
          phrases={this.$store.state.phrases}
        />
        <Playback />
      </div>
    );
  },
};
