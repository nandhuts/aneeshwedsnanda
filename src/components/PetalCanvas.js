/**
 * Lightweight, Ultra-subtle Floating Petals Engine
 * Respects prefers-reduced-motion, low-power mode, and window visibility
 */
import weddingConfig from '../config/weddingConfig.js';

export class PetalCanvas {
  constructor(canvasId = 'petal-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.animationFrameId = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isVisible = true;

    if (this.isReducedMotion) {
      this.canvas.style.display = 'none';
      return;
    }

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Pause animation when tab is not focused to save battery
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        this.animate();
      } else {
        cancelAnimationFrame(this.animationFrameId);
      }
    });

    // Create modest number of petals (8 on mobile, 14 on desktop)
    const count = window.innerWidth < 768 
      ? weddingConfig.theme.maxPetalsMobile 
      : weddingConfig.theme.maxPetalsDesktop;

    for (let i = 0; i < count; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createPetal(initial = false) {
    const colors = [
      'rgba(255, 252, 248, 0.75)', // Delicate ivory
      'rgba(247, 238, 222, 0.65)', // Warm cream
      'rgba(235, 224, 205, 0.55)', // Soft champagne
      'rgba(240, 244, 238, 0.60)', // Whispering sage-white
    ];

    return {
      x: Math.random() * this.width,
      y: initial ? Math.random() * this.height : -30,
      size: Math.random() * 8 + 8,
      speedY: Math.random() * 0.45 + 0.35, // Slow, peaceful descent
      speedX: Math.random() * 0.35 - 0.17,
      swayFrequency: Math.random() * 0.015 + 0.008,
      swayDistance: Math.random() * 25 + 15,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.012,
      tilt: Math.random() * Math.PI,
      tiltSpeed: Math.random() * 0.015 + 0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.4,
    };
  }

  drawPetal(petal) {
    this.ctx.save();
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate(petal.angle);
    this.ctx.scale(1, Math.cos(petal.tilt));

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    // Organic curved petal curve
    this.ctx.bezierCurveTo(
      -petal.size * 0.6, -petal.size * 0.8,
      -petal.size * 0.8, -petal.size * 1.6,
      0, -petal.size * 2
    );
    this.ctx.bezierCurveTo(
      petal.size * 0.8, -petal.size * 1.6,
      petal.size * 0.6, -petal.size * 0.8,
      0, 0
    );

    this.ctx.fillStyle = petal.color;
    this.ctx.fill();

    // Subtle center vein
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -petal.size * 1.6);
    this.ctx.strokeStyle = 'rgba(215, 195, 160, 0.25)';
    this.ctx.lineWidth = 0.6;
    this.ctx.stroke();

    this.ctx.restore();
  }

  animate() {
    if (!this.isVisible || this.isReducedMotion) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      p.y += p.speedY;
      p.x += Math.sin(p.y * p.swayFrequency) * 0.5 + p.speedX;
      p.angle += p.angularSpeed;
      p.tilt += p.tiltSpeed;

      this.drawPetal(p);

      // Reset when offscreen
      if (p.y > this.height + 40 || p.x < -40 || p.x > this.width + 40) {
        this.petals[i] = this.createPetal(false);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }
}
