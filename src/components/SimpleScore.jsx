// Should focus on this as a template
// https://alligator.io/vuejs/vue-html5-canvas/
export default {
  name: 'SimpleScore',
  props: ['currentPhraseIndex'],
  data() {
    return {
      phrases: [],
      canvasEl: null,
    };
  },
  watch: {
    currentPhraseIndex(i) {
      this.renderPhrase();
      // const octave = this.$data.octave;
      // cache[`./${i + 1}${octTag}.svg`].then((uri) => {
      //   this.$data.image = uri;
      // });
    },
  },
  mounted() {
    this.ctx = this.$refs['score-canvas'].getContext('2d');
    this.renderPhrase();
  },
  renderPhrase() {
    this.ctx.rect(50, 50, 50, 50);
    this.ctx.fillStyle = "#000";
    this.ctx.fill();
  },
  render() {
    return (
      <canvas
        ref="score-canvas"
        width="300"
        height="150"
      >
        You don't support JS, how did you get this far?
      </canvas>
    );
  },
};
