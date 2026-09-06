/**
 * Opening Experience (1.2s cinematic intro, dismissible instantly on tap)
 */
export class OpeningExperience {
  constructor() {
    this.overlay = document.getElementById('intro-curtain');
    this.monogram = document.getElementById('intro-monogram');
    this.heroContent = document.getElementById('hero-content');
    
    this.init();
  }

  init() {
    if (!this.overlay) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = isReduced ? 200 : 1200;

    const dismissNow = () => {
      if (this.overlay && this.overlay.style.display !== 'none') {
        this.overlay.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        this.overlay.style.opacity = '0';
        setTimeout(() => {
          this.overlay.style.display = 'none';
        }, 650);
      }
      if (this.heroContent) {
        this.heroContent.classList.remove('opacity-0', 'translate-y-4');
      }
    };

    // User can tap early to enter immediately
    this.overlay.addEventListener('click', dismissNow, { once: true });
    this.overlay.addEventListener('touchstart', dismissNow, { passive: true, once: true });

    // Or auto-dismiss after brief moment
    setTimeout(dismissNow, duration);
  }
}
