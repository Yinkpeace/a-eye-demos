'use strict';
const videos = [...document.querySelectorAll('video')];
videos.forEach((video, i) => {
  function showDuration() {
    if (!Number.isFinite(video.duration)) return;
    const seconds = Math.round(video.duration);
    document.getElementById(`duration-${i + 1}`).textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')} · MP4`;
  }
  video.addEventListener('loadedmetadata', showDuration);
  if (video.readyState >= 1) showDuration();
  video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); }));
  const reportError = () => { video.closest('article').querySelector('.video-error').hidden = false; };
  video.addEventListener('error', reportError);
  video.querySelector('source').addEventListener('error', reportError);
});
