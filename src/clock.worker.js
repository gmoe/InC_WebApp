self.addEventListener('message', () => {
  setInterval(() => self.postMessage('tick'), 150);
});