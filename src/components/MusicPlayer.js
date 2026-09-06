/**
 * Background Music Controller with Browser Autoplay Handling & Persistence
 */
import weddingConfig from '../config/weddingConfig.js';

export class MusicPlayer {
  constructor() {
    this.audio = new Audio(weddingConfig.media.music.src);
    this.audio.loop = weddingConfig.media.music.loop;
    this.audio.volume = weddingConfig.media.music.defaultVolume;

    this.isPlaying = false;
    this.isMuted = false;
    this.hasUserInteracted = false;

    // DOM Elements
    this.floatingBtn = document.getElementById('music-toggle-btn');
    this.soundBars = document.getElementById('music-soundbars');
    this.musicIcon = document.getElementById('music-icon');
    this.musicLabel = document.getElementById('music-label');
    this.firstInteractBanner = document.getElementById('music-hint-banner');

    this.init();
  }

  init() {
    // Read session state
    const savedState = sessionStorage.getItem('wedding_music_state');
    const wasMuted = sessionStorage.getItem('wedding_music_muted') === 'true';

    if (wasMuted) {
      this.isMuted = true;
      this.audio.muted = true;
    }

    // Set up click handlers
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

    // Auto-listen for first user gesture to unlock audio context smoothly
    const onFirstUserGesture = () => {
      if (!this.hasUserInteracted) {
        this.hasUserInteracted = true;
        // If user previously played in this session, resume automatically
        if (savedState === 'playing') {
          this.play();
        }
      }
      window.removeEventListener('click', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    };

    window.addEventListener('click', onFirstUserGesture, { once: true });
    window.addEventListener('touchstart', onFirstUserGesture, { once: true });

    // Handle audio events
    this.audio.addEventListener('play', () => this.updateUI(true));
    this.audio.addEventListener('pause', () => this.updateUI(false));
    this.audio.addEventListener('ended', () => this.updateUI(false));
  }

  async play() {
    try {
      await this.audio.play();
      this.isPlaying = true;
      sessionStorage.setItem('wedding_music_state', 'playing');
      this.dismissHint();
    } catch (err) {
      console.warn("Audio autoplay blocked by browser until direct interaction.", err);
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
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
