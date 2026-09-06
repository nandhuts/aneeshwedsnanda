/**
 * Calendar Event Integration for Android, iPhone, and Desktop
 * Generates standard RFC 5545 .ics files and Google Calendar deep links
 */
import weddingConfig from '../config/weddingConfig.js';

export class CalendarModal {
  constructor() {
    this.modal = document.getElementById('calendar-modal');
    this.openBtns = document.querySelectorAll('.trigger-add-calendar');
    this.closeBtn = document.getElementById('close-calendar-modal');
    this.downloadIcsBtn = document.getElementById('btn-download-ics');
    this.googleCalBtn = document.getElementById('btn-google-calendar');
    this.appleCalBtn = document.getElementById('btn-apple-calendar');

    this.init();
  }

  init() {
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    if (this.downloadIcsBtn) {
      this.downloadIcsBtn.addEventListener('click', () => this.downloadICS());
    }

    if (this.appleCalBtn) {
      this.appleCalBtn.addEventListener('click', () => this.downloadICS());
    }

    if (this.googleCalBtn) {
      this.googleCalBtn.addEventListener('click', () => this.openGoogleCalendar());
    }

    const directGoogle = document.getElementById('btn-direct-google-cal');
    if (directGoogle) {
      directGoogle.addEventListener('click', () => this.openGoogleCalendar());
    }

    const directApple = document.getElementById('btn-direct-apple-cal');
    if (directApple) {
      directApple.addEventListener('click', () => this.downloadICS());
    }

    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  generateICSContent() {
    // 5 October 2026, 4:00 PM IST to 8:00 PM IST
    // IST is UTC+5:30 -> 16:00 IST = 10:30 UTC
    // End: 20:00 IST = 14:30 UTC
    const startUTC = '20261005T103000Z';
    const endUTC = '20261005T143000Z';
    const nowUTC = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aneesh Albert & Nanda Rajan//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-aneesh-nanda-20261005@wedding.invitation`,
      `DTSTAMP:${nowUTC}`,
      `DTSTART:${startUTC}`,
      `DTEND:${endUTC}`,
      `SUMMARY:${weddingConfig.couple.fullTitle} Wedding`,
      `DESCRIPTION:${weddingConfig.copy.invitationMessage}\\n\\nVenue: ${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}\\nMaps: ${weddingConfig.event.googleMapsUrl}`,
      `LOCATION:${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`,
      `URL:${weddingConfig.event.googleMapsUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  downloadICS() {
    const icsContent = this.generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'aneesh-nanda-wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
    this.close();
  }

  openGoogleCalendar() {
    const startUTC = '20261005T103000Z';
    const endUTC = '20261005T143000Z';
    const title = encodeURIComponent(`${weddingConfig.couple.fullTitle} Wedding`);
    const details = encodeURIComponent(
      `${weddingConfig.copy.invitationMessage}\n\nVenue: ${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}\nLocation Map: ${weddingConfig.event.googleMapsUrl}`
    );
    const location = encodeURIComponent(`${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`);

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${details}&location=${location}`;
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
    this.close();
  }
}
