/**
 * Background Music Controller with Immediate Autoplay & Gesture Unlock
 */
import weddingConfig from '../config/weddingConfig.js';

export class MusicPlayer {
  constructor() {
    // Check if HTML already has audio element or create new
    this.audio = document.getElementById('wedding-audio') || new Audio(weddingConfig.media.music.src);
    this.audio.loop = weddingConfig.media.music.loop;
    this.audio.volume = weddingConfig.media.music.defaultVolume;

    this.isPlaying = false;
    this.isMuted = false;
    this.manuallyPaused = false;

    // DOM Elements
    this.floatingBtn = document.getElementById('music-toggle-btn');
    this.soundBars = document.getElementById('music-soundbars');
    this.musicIcon = document.getElementById('music-icon');
    this.musicLabel = document.getElementById('music-label');
    this.firstInteractBanner = document.getElementById('music-hint-banner');

    this.init();
  }

  init() {
    // Check if user previously muted
    const wasMuted = sessionStorage.getItem('wedding_music_muted') === 'true';
    if (wasMuted) {
      this.isMuted = true;
      this.audio.muted = true;
    }

    // Attempt instant autoplay immediately on page load
    this.play().catch(() => {});

    // Multi-event gesture unlock for mobile browsers (Safari/Chrome)
    const unlockAudioEvents = ['touchstart', 'touchend', 'click', 'scroll', 'pointerdown', 'keydown'];
    const onUserInteraction = () => {
      if (!this.isPlaying && !this.manuallyPaused) {
        this.play().catch(() => {});
      }
      unlockAudioEvents.forEach(evt => {
        window.removeEventListener(evt, onUserInteraction);
        document.removeEventListener(evt, onUserInteraction);
      });
    };

    unlockAudioEvents.forEach(evt => {
      window.addEventListener(evt, onUserInteraction, { passive: true, once: true });
      document.addEventListener(evt, onUserInteraction, { passive: true, once: true });
    });

    // Intro curtain click unlock
    const curtain = document.getElementById('intro-curtain');
    if (curtain) {
      curtain.addEventListener('click', () => {
        if (!this.isPlaying) this.play().catch(() => {});
      }, { once: true });
    }

    // Set up floating button toggle
    if (this.floatingBtn) {
      this.floatingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlay();
      });
    }

    if (this.firstInteractBanner) {
      this.firstInteractBanner.addEventListener('click', () => {
        this.play();
        this.dismissHint();
      });
    }

    // Handle audio events
    this.audio.addEventListener('play', () => this.updateUI(true));
    this.audio.addEventListener('pause', () => this.updateUI(false));
    this.audio.addEventListener('ended', () => this.updateUI(false));
  }

  async play() {
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.manuallyPaused = false;
      sessionStorage.setItem('wedding_music_state', 'playing');
      this.dismissHint();
    } catch (err) {
      // Browser blocked zero-click autoplay; wait for gesture unlock
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.manuallyPaused = true;
    sessionStorage.setItem('wedding_music_state', 'paused');
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    sessionStorage.setItem('wedding_music_muted', String(this.isMuted));
    this.updateUI(this.isPlaying);
  }

  dismissHint() {
    if (this.firstInteractBanner) {
      this.firstInteractBanner.style.opacity = '0';
      setTimeout(() => {
        this.firstInteractBanner.style.display = 'none';
      }, 400);
    }
  }

  updateUI(playing) {
    this.isPlaying = playing;

    if (playing) {
      if (this.soundBars) this.soundBars.classList.remove('hidden');
      if (this.musicIcon) this.musicIcon.classList.add('hidden');
      if (this.floatingBtn) {
        this.floatingBtn.setAttribute('aria-label', 'Pause wedding music');
        this.floatingBtn.classList.add('ring-2', 'ring-[#C2A366]/40');
      }
      if (this.musicLabel) this.musicLabel.textContent = 'Playing';
    } else {
      if (this.soundBars) this.soundBars.classList.add('hidden');
      if (this.musicIcon) this.musicIcon.classList.remove('hidden');
      if (this.floatingBtn) {
        this.floatingBtn.setAttribute('aria-label', 'Play wedding music');
        this.floatingBtn.classList.remove('ring-2', 'ring-[#C2A366]/40');
      }
      if (this.musicLabel) this.musicLabel.textContent = 'Play Melody';
    }
  }
}
