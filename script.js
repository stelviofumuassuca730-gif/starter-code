// ── PARTICLES ──
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(6,182,212,'];

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : H + 10;
    this.r  = Math.random() * 1.2 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = -(Math.random() * 0.4 + 0.1);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10) this.reset(false);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) particles.push(new Particle());

function loop() {
  ctx.clearRect(0, 0, W, H);
  // faint connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,102,241,${0.04 * (1 - dist/90)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(loop);
}
loop();

// ── TYPEWRITER ──
const phrases = [
  'Computer Science Student',
  'Frontend Developer',
  'Building Muzimóveis',
  'Based in Chandigarh, India',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    tw.textContent = phrase.slice(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = phrase.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 38 : 62);
}
type();

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── MOBILE NAV ──
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  toggle.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
  });
});

// ── REVEAL ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));