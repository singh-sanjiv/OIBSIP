function playAudio() {
  const audio = document.getElementById('biographyAudio');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
