export default {
  name: 'HelloWorld',
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
            v-on:mousedown={() => this.$store.commit('playButtonPressed')}
            v-on:mouseup={() => this.$store.commit('playButtonReleased')}
          >
            Play
          </button>
        </div>
      </main>
    );
  },
};
