/**
 * Timezone-aware Countdown Timer
 * Target: 5 October 2026, 4:00 PM IST (Asia/Kolkata, UTC+05:30)
 */
import weddingConfig from '../config/weddingConfig.js';

export class Countdown {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.targetTime = new Date(weddingConfig.event.targetDateTimeISO).getTime();
    this.intervalId = null;
    this.daysEl = null;
    this.hoursEl = null;
    this.minutesEl = null;
    this.secondsEl = null;
    this.completedEl = null;
    this.digitsContainer = null;
    
    this.init();
  }

  init() {
    if (!this.container) return;

    this.daysEl = this.container.querySelector('#countdown-days');
    this.hoursEl = this.container.querySelector('#countdown-hours');
    this.minutesEl = this.container.querySelector('#countdown-minutes');
    this.secondsEl = this.container.querySelector('#countdown-seconds');
    this.completedEl = this.container.querySelector('#countdown-completed');
    this.digitsContainer = this.container.querySelector('#countdown-grid');

    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  pad(num) {
    return String(Math.max(0, num)).padStart(2, '0');
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetTime - now;

    if (distance <= 0) {
      if (this.intervalId) clearInterval(this.intervalId);
      if (this.digitsContainer) this.digitsContainer.classList.add('hidden');
      if (this.completedEl) {
        this.completedEl.classList.remove('hidden');
        this.completedEl.textContent = weddingConfig.copy.celebrationArrivalText;
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = this.pad(days);
    if (this.hoursEl) this.hoursEl.textContent = this.pad(hours);
    if (this.minutesEl) this.minutesEl.textContent = this.pad(minutes);
    if (this.secondsEl) this.secondsEl.textContent = this.pad(seconds);
  }

  destroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
