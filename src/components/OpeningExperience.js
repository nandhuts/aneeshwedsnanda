/**
 * Opening Experience (1.2 - 1.5s seamless cinematic intro)
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

    // Trigger reveal after brief elegant moment
    setTimeout(() => {
      if (this.overlay) {
        this.overlay.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        this.overlay.style.opacity = '0';
        
        setTimeout(() => {
          this.overlay.style.display = 'none';
        }, 850);
      }

      if (this.heroContent) {
        this.heroContent.classList.remove('opacity-0', 'translate-y-4');
      }
    }, duration);
  }
}
