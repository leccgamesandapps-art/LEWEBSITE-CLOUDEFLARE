// ===== LEWEBSITE - Minecraft Theme Scripts =====

// Create floating particles
function createParticles() {
  const container = document.getElementById('particles');
  const count = 25;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.width = p.style.height = (3 + Math.random() * 5) + 'px';
    container.appendChild(p);
  }
}

// Button click effects
function setupButtons() {
  const exploreBtn = document.getElementById('exploreBtn');
  const joinBtn = document.getElementById('joinBtn');
  const block = document.getElementById('floatingBlock');

  exploreBtn.addEventListener('click', () => {
    exploreBtn.classList.add('clicked');
    alert('⛏ Exploring Worlds... (demo)');
    setTimeout(() => exploreBtn.classList.remove('clicked'), 300);
  });

  joinBtn.addEventListener('click', () => {
    joinBtn.classList.add('clicked');
    alert('⚡ Joining Server... (demo)');
    setTimeout(() => joinBtn.classList.remove('clicked'), 300);
  });

  // Click the floating block
  block.addEventListener('click', () => {
    block.style.animation = 'none';
    block.offsetHeight; // trigger reflow
    block.style.animation = 'floatBlock 0.4s ease, shake 0.4s ease';
    setTimeout(() => {
      block.style.animation = 'floatBlock 4s ease-in-out infinite';
    }, 400);
  });
}

// Card hover bounce trigger
function setupCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Extra animation for block shake
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px) rotate(-3deg); }
    75% { transform: translateX(8px) rotate(3deg); }
  }
`;
document.head.appendChild(style);

// Init
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupButtons();
  setupCards();
  console.log('%cLEWEBSITE loaded ⛏', 'color: #5d9c3d; font-weight: bold;');
});