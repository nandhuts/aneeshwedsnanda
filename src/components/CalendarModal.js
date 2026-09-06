/**
 * Direct One-Tap Add to Calendar Handler (iOS Apple Calendar & Android/Web Google Calendar)
 * No confusing format download sections.
 */
import weddingConfig from '../config/weddingConfig.js';

export class CalendarModal {
  constructor() {
    this.buttons = document.querySelectorAll('.trigger-add-calendar');
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.directAddToCalendar();
      });
    });
  }

  directAddToCalendar() {
    // Detect iOS (iPhone / iPad / iPod / Safari)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // Direct Apple Calendar event via .ics download
      this.downloadICS();
    } else {
      // Direct Google Calendar event creation
      this.openGoogleCalendar();
    }
  }

  generateICSContent() {
    // 5 October 2026, 4:00 PM IST to 8:00 PM IST (Asia/Kolkata UTC+5:30 -> 10:30 UTC)
    const startUTC = '20261005T103000Z';
    const endUTC = '20261005T143000Z';
    const nowUTC = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aneesh Abraham & Nanda Rajan//Wedding Invitation//EN',
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
  }
}
