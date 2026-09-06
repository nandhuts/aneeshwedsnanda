/**
 * Minimalist Floating Navigation Controller
 */
export class Navigation {
  constructor() {
    this.navBtn = document.getElementById('nav-toggle-btn');
    this.navDrawer = document.getElementById('nav-drawer');
    this.navCloseBtn = document.getElementById('nav-close-btn');
    this.navLinks = document.querySelectorAll('.nav-link-item');
    this.isOpen = false;

    this.init();
  }

  init() {
    if (this.navBtn) {
      this.navBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.navCloseBtn) {
      this.navCloseBtn.addEventListener('click', () => this.close());
    }

    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        this.close();
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    if (this.navDrawer) {
      this.navDrawer.addEventListener('click', (e) => {
        if (e.target === this.navDrawer) this.close();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Scroll spy for subtle active indication
    this.setupScrollSpy();
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    if (!this.navDrawer) return;
    this.isOpen = true;
    this.navDrawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.navDrawer) return;
    this.isOpen = false;
    this.navDrawer.classList.add('hidden');
    document.body.style.overflow = '';
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute('id');
        }
      });

      this.navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSection) {
          link.classList.add('text-[#C2A366]', 'font-semibold');
        } else {
          link.classList.remove('text-[#C2A366]', 'font-semibold');
        }
      });
    }, { passive: true });
  }
}
