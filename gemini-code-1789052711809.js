/**
 * ============================================================================
 * LUXURY WEDDING INVITATION CONFIGURATION
 * Edit this object to update the site details across all sections automatically.
 * ============================================================================
 */
const WEDDING_CONFIG = {
  // Couple Names
  groomName: "محمد",
  brideName: "فاطمة",

  // Wedding Date & Time (ISO format for countdown calculation)
  weddingDate: "2026-10-09T19:30:00",
  dateDisplay: "09 • 10 • 2026",
  weddingTimeDisplay: "السابعة والنصف مساءً",

  // Location & Venue Details
  venueName: "قصر النرجس للأفراح",
  venueAddress: "طريق الملك فهد، حي المروج، الرياض",
  venueCitySub: "القاعة الكبرى الفاخرة",
  googleMapsUrl: "https://maps.google.com/?q=24.7136,46.6753", // Replace with exact Maps pin

  // Dress Code
  dressCode: "ملابس رسمية أنيقة (Formal Chic)",

  // WhatsApp RSVP Setup
  // Format: international number without '+' or special symbols (e.g. 966501234567)
  whatsappNumber: "966501234567",
  whatsappMessage: "السلام عليكم ورحمة الله وبركاته، يشرفني تأكيد حضور حفل زفافكم بتاريخ 09/10/2026 ❤️",

  // Audio Music URL (Optional: direct MP3 link)
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-9835.mp3",

  // Photos (Custom URLs)
  groomPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  bridePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
};

/* ============================================================================
   INITIALIZATION & DOM BINDING
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  applyConfiguration(WEDDING_CONFIG);
  initGoldenParticles();
  initOpeningCurtain();
  initAudioPlayer();
  initCountdownTimer(WEDDING_CONFIG.weddingDate);
  initScrollAnimations();
  initNavigation();
  initGalleryLightbox();
});

/**
 * Syncs the WEDDING_CONFIG data directly to DOM nodes
 */
function applyConfiguration(config) {
  // Replace Bride & Groom Names everywhere
  document.querySelectorAll(".config-groom-name").forEach(el => el.textContent = config.groomName);
  document.querySelectorAll(".config-bride-name").forEach(el => el.textContent = config.brideName);
  
  // Update Time, Venue, and Dress Code
  document.querySelectorAll(".config-time").forEach(el => el.textContent = config.weddingTimeDisplay);
  document.querySelectorAll(".config-venue-name").forEach(el => el.textContent = config.venueName);
  document.querySelectorAll(".config-venue-address").forEach(el => el.textContent = config.venueAddress);
  document.querySelectorAll(".config-venue-city").forEach(el => el.textContent = config.venueCitySub);
  document.querySelectorAll(".config-dress-code").forEach(el => el.textContent = config.dressCode);

  // Update Photos
  const groomImg = document.getElementById("groom-img");
  if (groomImg && config.groomPhoto) groomImg.src = config.groomPhoto;
  
  const brideImg = document.getElementById("bride-img");
  if (brideImg && config.bridePhoto) brideImg.src = config.bridePhoto;

  // Google Maps Button Link
  const mapsBtn = document.getElementById("maps-btn");
  if (mapsBtn && config.googleMapsUrl) {
    mapsBtn.href = config.googleMapsUrl;
  }

  // WhatsApp RSVP link
  const rsvpBtn = document.getElementById("whatsapp-rsvp-btn");
  if (rsvpBtn) {
    const encodedMsg = encodeURIComponent(config.whatsappMessage);
    rsvpBtn.href = `https://wa.me/${config.whatsappNumber}?text=${encodedMsg}`;
  }

  // Audio Player source
  const bgAudio = document.getElementById("bg-audio");
  if (bgAudio && config.musicUrl) {
    bgAudio.src = config.musicUrl;
  }
}

/* ============================================================================
   FLOATING CANVAS GOLDEN PARTICLES
   ============================================================================ */
function initGoldenParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 45);
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = -(Math.random() * 0.4 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.fade = Math.random() * 0.01 + 0.005;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fade;

      if (this.y < 0 || this.opacity <= 0) {
        this.reset();
        this.y = height + 5;
        this.opacity = Math.random() * 0.7 + 0.3;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(223, 183, 108, ${this.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#dfb76c";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================================================
   OPENING CURTAIN TRANSITION
   ============================================================================ */
function initOpeningCurtain() {
  const enterBtn = document.getElementById("enter-btn");
  const openingScreen = document.getElementById("opening-curtain");
  const bgAudio = document.getElementById("bg-audio");
  const musicToggle = document.getElementById("music-toggle");

  if (!enterBtn || !openingScreen) return;

  enterBtn.addEventListener("click", () => {
    openingScreen.classList.add("fade-out");

    // Start background music gracefully upon explicit user interaction
    if (bgAudio && WEDDING_CONFIG.musicUrl) {
      bgAudio.play().then(() => {
        if (musicToggle) musicToggle.classList.add("playing");
      }).catch(() => {
        // Autoplay permissions fallback
      });
    }

    // Smooth scroll to top of announcement
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
  });
}

/* ============================================================================
   AUDIO PLAYER TOGGLE
   ============================================================================ */
function initAudioPlayer() {
  const musicToggle = document.getElementById("music-toggle");
  const bgAudio = document.getElementById("bg-audio");
  if (!musicToggle || !bgAudio) return;

  musicToggle.addEventListener("click", () => {
    if (!WEDDING_CONFIG.musicUrl) return;

    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        musicToggle.classList.add("playing");
      }).catch(e => console.log("Audio playback error:", e));
    } else {
      bgAudio.pause();
      musicToggle.classList.remove("playing");
    }
  });
}

/* ============================================================================
   COUNTDOWN TIMER
   ============================================================================ */
function initCountdownTimer(targetDateString) {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const clockContainer = document.getElementById("countdown-clock");
  const celebrateMsg = document.getElementById("countdown-celebration");

  const targetTime = new Date(targetDateString).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      if (clockContainer) clockContainer.classList.add("hidden");
      if (celebrateMsg) celebrateMsg.classList.remove("hidden");
      clearInterval(interval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  const interval = setInterval(update, 1000);
}

/* ============================================================================
   SCROLL-TRIGGERED ENTRANCE ANIMATIONS
   ============================================================================ */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-element");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ============================================================================
   NAVIGATION DRAWER
   ============================================================================ */
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navClose = document.getElementById("nav-close");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!siteNav || !navToggle) return;

  function openNav() {
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", openNav);
  if (navClose) navClose.addEventListener("click", closeNav);

  navLinks.forEach(link => {
    link.addEventListener("click", closeNav);
  });
}

/* ============================================================================
   LIGHTBOX GALLERY (KEYBOARD, TOUCH SWIPE, ARROWS)
   ============================================================================ */
function initGalleryLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-current-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !galleryItems.length) return;

  const imagesList = Array.from(galleryItems).map(item => {
    const img = item.querySelector("img");
    return img ? img.src : "";
  });

  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = imagesList.length - 1;
    if (index >= imagesList.length) index = 0;
    currentIndex = index;
    lightboxImg.src = imagesList[currentIndex];
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex + 1); // RTL flip
    if (e.key === "ArrowRight") showImage(currentIndex - 1);
  });

  // Mobile swipe support
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) showImage(currentIndex - 1); // Swiped right
      else showImage(currentIndex + 1); // Swiped left
    }
  }, { passive: true });
}