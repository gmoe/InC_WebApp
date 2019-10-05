export default {
  name: 'Playback',
  render() {
    return (
      <main>
        <h1>LUTE: inC</h1>
        <div style={{ display: 'grid', gridAutoFlow: 'column', gridGap: '10px', gridAutoColumns: 'min-content' }}>
          <button
            v-on:click={() => {
              this.$store.commit('startAudio');
              this.$store.dispatch('startClock');
            }}
          >
            Start
          </button>
          <button
            v-on:click={() => this.$store.commit('toggleOstinato')}
          >
            Toggle Ostinato
          </button>
        </div>
        <div style={{ display: 'grid', gridAutoFlow: 'column', gridGap: '10px', gridAutoColumns: 'min-content' }}>
          <button
            v-on:click={() => this.$store.commit('previousPhrase')}
          >
            Previous
          </button>
          <button
            v-on:mousedown={() => this.$store.commit('playButtonPressed')}
            v-on:mouseup={() => this.$store.commit('playButtonReleased')}
          >
            {`Play (${this.$store.state.currentPhraseIndex + 1})`}
          </button>
          <button
            v-on:click={() => this.$store.commit('nextPhrase')}
          >
            Next
          </button>
        </div>
      </main>
    );
  },
};
