// LEWEBSITE - Single Page Navigation

function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (7 + Math.random() * 9) + 's';
    p.style.animationDelay = Math.random() * 7 + 's';
    p.style.width = p.style.height = (3 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  // Show target section
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-section') === sectionId) {
      btn.classList.add('active');
    }
  });

  // Update URL hash without jumping
  history.replaceState(null, null, '#' + sectionId);
}

function setupNavigation() {
  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const section = btn.getAttribute('data-section');
      showSection(section);
    });
  });

  // Also handle normal <a href="#..."> links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href').substring(1);
      if (document.getElementById(hash)) {
        e.preventDefault();
        showSection(hash);
      }
    });
  });

  // On page load, check URL hash
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  } else {
    showSection('main');
  }

  // Handle browser back/forward
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.substring(1) || 'main';
    showSection(newHash);
  });
}

function setupBlock() {
  const block = document.getElementById('floatingBlock');
  if (!block) return;

  block.addEventListener('click', () => {
    block.style.animation = 'none';
    block.offsetHeight;
    block.style.animation = 'floatBlock 0.35s ease, shake 0.35s ease';
    setTimeout(() => {
      block.style.animation = 'floatBlock 4.2s ease-in-out infinite';
    }, 350);
  });
}

// Shake keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px) rotate(-2deg); }
    75% { transform: translateX(6px) rotate(2deg); }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupNavigation();
  setupBlock();
});