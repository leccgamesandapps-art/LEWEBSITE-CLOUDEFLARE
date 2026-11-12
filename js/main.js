// LEWEBSITE Scripts

function createParticles() {
  const box = document.getElementById('particles');
  if (!box) return;

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = Math.random() * 6 + 's';
    box.appendChild(p);
  }
}

function showSection(id) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === id);
  });

  history.replaceState(null, null, '#' + id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupNav() {
  document.querySelectorAll('.nav-btn, a[href^="#"]').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const id = href.slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        showSection(id);
      }
    });
  });

  const hash = location.hash.slice(1);
  showSection(hash && document.getElementById(hash) ? hash : 'main');

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1) || 'main';
    showSection(id);
  });
}

function setupBlock() {
  const block = document.getElementById('grassBlock');
  if (!block) return;

  block.addEventListener('click', () => {
    block.style.animation = 'none';
    block.offsetHeight;
    block.style.animation = 'float 0.3s ease, shake 0.3s ease';
    setTimeout(() => {
      block.style.animation = 'float 3.5s ease-in-out infinite';
    }, 300);
  });
}

// Shake
const s = document.createElement('style');
s.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`;
document.head.appendChild(s);

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupNav();
  setupBlock();
});