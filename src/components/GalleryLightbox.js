/**
 * Minimalist Editorial Gallery Lightbox with Keyboard & Touch Gestures
 */
import weddingConfig from '../config/weddingConfig.js';

export class GalleryLightbox {
  constructor() {
    this.modal = document.getElementById('gallery-lightbox');
    this.imageEl = document.getElementById('lightbox-img');
    this.titleEl = document.getElementById('lightbox-title');
    this.subtitleEl = document.getElementById('lightbox-subtitle');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');

    this.currentIndex = 0;
    this.images = weddingConfig.media.gallery;

    this.init();
  }

  init() {
    // Attach click listeners to gallery cards
    const triggers = document.querySelectorAll('[data-gallery-index]');
    triggers.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(el.getAttribute('data-gallery-index'), 10);
        this.open(index);
      });
    });

    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal || e.target.id === 'lightbox-backdrop') {
          this.close();
        }
      });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!this.modal || this.modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Simple touch swipe support
    let touchStartX = 0;
    if (this.modal) {
      this.modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.modal.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) this.next();
          else this.prev();
        }
      }, { passive: true });
    }
  }

  open(index) {
    if (!this.modal || index < 0 || index >= this.images.length) return;
    this.currentIndex = index;
    this.render();
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.render();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.render();
  }

  render() {
    const item = this.images[this.currentIndex];
    if (!item) return;

    if (this.imageEl) {
      this.imageEl.src = item.src;
      this.imageEl.alt = item.title || "Aneesh & Nanda";
    }
    if (this.titleEl) this.titleEl.textContent = item.title || "";
    if (this.subtitleEl) this.subtitleEl.textContent = item.subtitle || "";
  }
}
