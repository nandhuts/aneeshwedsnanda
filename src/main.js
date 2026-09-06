import './styles/main.css';
import weddingConfig from './config/weddingConfig.js';
import { OpeningExperience } from './components/OpeningExperience.js';
import { PetalCanvas } from './components/PetalCanvas.js';
import { MusicPlayer } from './components/MusicPlayer.js';
import { Countdown } from './components/Countdown.js';
import { CalendarModal } from './components/CalendarModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Opening Animation
  new OpeningExperience();

  // 2. Initialize Floating Botanical Petals
  if (weddingConfig.theme.showPetalEffect) {
    new PetalCanvas('petal-canvas');
  }

  // 3. Initialize Background Music Player
  const musicPlayer = new MusicPlayer();

  // 4. Initialize Accurate Countdown Timer
  new Countdown('#countdown-section');

  // 5. Initialize Calendar Generator & Modal
  new CalendarModal();

  // 8. Setup Smooth Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 9. WhatsApp Direct Sharing Handler
  const shareBtn = document.getElementById('btn-share-whatsapp');
  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shareText = `*Aneesh Albert & Nanda Rajan* Wedding Invitation 💍\n\nJoin us as we celebrate our holy matrimony on Monday, 5 October 2026 at 4:00 PM.\nVenue: St. Joseph Malankara Catholic Church, Punalur.\n\nView Invitation & Map: ${window.location.href}`;
      
      if (navigator.share) {
        navigator.share({
          title: weddingConfig.meta.siteTitle,
          text: shareText,
          url: window.location.href,
        }).catch(() => {});
      } else {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // 10. Copy Map Address Toast Handler
  const copyAddressBtn = document.getElementById('btn-copy-address');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = `${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`;
      navigator.clipboard.writeText(address).then(() => {
        const originalText = copyAddressBtn.innerHTML;
        copyAddressBtn.innerHTML = `<span>Copied to Clipboard!</span>`;
        setTimeout(() => {
          copyAddressBtn.innerHTML = originalText;
        }, 2200);
      });
    });
  }
});
