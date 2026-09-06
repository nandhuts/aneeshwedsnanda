/**
 * =========================================================================
 * WEDDING INVITATION CONFIGURATION
 * =========================================================================
 * All central content, couple details, event schedules, map links,
 * media assets, and social metadata are configured in this file.
 * Modify these settings directly without editing core markup or styles.
 */

export const weddingConfig = {
  // Couple Information
  couple: {
    groom: {
      firstName: "Aneesh",
      fullName: "Aneesh Albert",
      bio: "Gentle, devoted, and finding true home in Nanda's laughter."
    },
    bride: {
      firstName: "Nanda",
      fullName: "Nanda Rajan",
      bio: "Graceful, radiant, and bringing warmth to every single moment."
    },
    title: "Aneesh & Nanda",
    fullTitle: "Aneesh Albert & Nanda Rajan",
    hashtag: "#AneeshWedsNanda",
  },

  // Wedding Ceremony Details
  event: {
    title: "The Holy Matrimony & Wedding Reception",
    dateFormatted: "5 October 2026",
    dayOfWeek: "Monday",
    timeFormatted: "4:00 PM",
    timeSubtext: "in the golden afternoon",
    
    // ISO 8601 target with Asia/Kolkata (+05:30) timezone offset
    // 5 October 2026, 4:00 PM IST
    targetDateTimeISO: "2026-10-05T16:00:00+05:30",
    
    // Calendar event duration in hours
    durationHours: 4,
    
    venueName: "St. Joseph Malankara Catholic Church",
    venueAddress: "Punalur, Kollam District, Kerala, India",
    
    // Exact Google Maps Link (MUST NOT BE ALTERED)
    googleMapsUrl: "https://maps.app.goo.gl/kZm5MFy6tTdUcsYd6",
    
    // Embedded map coordinates for interactive preview
    coordinates: {
      lat: 9.0195,
      lng: 76.9249,
      zoom: 15
    }
  },

  // Editorial Copy & Messages
  copy: {
    eyebrow: "WITH LOVE & GRATITUDE",
    heroHeading: "A NEW CHAPTER BEGINS",
    
    invitationMessage: 
      "With grateful hearts and the blessings of our families, we invite you to celebrate the beginning of our forever.",
      
    coupleSectionHeading: "Two hearts. One beautiful beginning.",
    coupleSectionSubtext: 
      "From quiet conversations to shared dreams, every road has led us to this blessed union. Together with our families, we step into a lifetime of enduring love, friendship, and faith.",

    venueSectionTitle: "The Holy Sanctuary",
    venueDescription: 
      "Set amidst the serene landscapes of Punalur, St. Joseph Malankara Catholic Church welcomes you to witness our sacred vows.",

    finalSectionHeading: "WE WOULD LOVE TO HAVE YOU WITH US",
    finalSectionMessage: "Your presence and blessings mean the world to us as we embark on this sacred journey together.",
    
    rsvpNote: "Kindly keep us in your prayers.",
    celebrationArrivalText: "THE DAY HAS ARRIVED ❤️"
  },

  // Media Assets
  media: {
    heroImage: "/images/couple-hero.webp",
    heroFallback: "/images/couple-hero.jpg",
    
    couplePortrait: "/images/gallery-closeup.webp",
    couplePortraitFallback: "/images/gallery-closeup.jpg",

    music: {
      src: "./audio/wedding-music.wav",
      title: "Romantic Wedding Theme",
      artist: "Aneesh & Nanda's Melody",
      autoPlayHint: "Tap anywhere for ambient melody ♫",
      defaultVolume: 0.75,
      loop: true
    },

    gallery: [
      {
        id: "hero-shot",
        src: "/images/couple-hero.webp",
        fallback: "/images/couple-hero.jpg",
        title: "Together in Love",
        subtitle: "A lifetime of quiet joy",
        span: "col-span-12 md:col-span-7 row-span-2",
        aspect: "aspect-[3/4]"
      },
      {
        id: "closeup-shot",
        src: "/images/gallery-closeup.webp",
        fallback: "/images/gallery-closeup.jpg",
        title: "Pure Radiance",
        subtitle: "Laughter & warmth",
        span: "col-span-6 md:col-span-5",
        aspect: "aspect-[4/5]"
      },
      {
        id: "medium-shot",
        src: "/images/gallery-medium.webp",
        fallback: "/images/gallery-medium.jpg",
        title: "Side by Side",
        subtitle: "Hand in hand towards tomorrow",
        span: "col-span-6 md:col-span-5",
        aspect: "aspect-[4/5]"
      },
      {
        id: "wide-shot",
        src: "/images/gallery-wide.webp",
        fallback: "/images/gallery-wide.jpg",
        title: "Our Sacred Day",
        subtitle: "5 October 2026 • Punalur",
        span: "col-span-12",
        aspect: "aspect-[16/9]"
      }
    ]
  },

  // Social Sharing & Open Graph Metadata
  meta: {
    siteTitle: "Aneesh Albert & Nanda Rajan | Wedding Invitation",
    siteDescription: "Join us as we begin our beautiful new chapter together on 5 October 2026 at St. Joseph Malankara Catholic Church, Punalur.",
    canonicalUrl: "https://aneesh-weds-nanda.wedding",
    ogImage: "/images/og-image.jpg",
    ogImageType: "image/jpeg",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    themeColor: "#FAF7F2"
  },

  // Aesthetic Customizations
  theme: {
    petalColor: "#FAF3E8",
    maxPetalsMobile: 8,
    maxPetalsDesktop: 14,
    showPetalEffect: true,
  }
};

export default weddingConfig;
