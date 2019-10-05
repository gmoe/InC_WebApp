import phraseOne from '../phrases/svgs/1.svg';
const cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

const images = importAll(require.context('../phrases/svgs', false, /\.svg$/, 'eager'));

console.log(cache);

export default {
  name: 'Score',
  props: ['currentPhraseIndex'],
  data() {
    return {
      image: phraseOne,
      octave: 0,
    };
  },
  watch: {
    currentPhraseIndex(i) {
      const octTag = (() => {
        const octave = this.$data.octave;
        if (octave > 0) return `+${octave}`;
        if (octave < 0) return `_${Math.abs(octave)}`;
        return '';
      })();

      cache[`./${i + 1}${octTag}.svg`].then((uri) => {
        this.$data.image = uri;
      });
    },
  },
  render() {
    return (
      <div style={{ background: 'white' }}>
        <img src={this.$data.image} />
      </div>
    );
  },
};
