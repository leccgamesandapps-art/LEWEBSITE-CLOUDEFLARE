// Basic Minecraft Style Website Scripts

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

function setupButtons() {
  const aboutBtn = document.getElementById('aboutBtn');
  const projectsBtn = document.getElementById('projectsBtn');
  const block = document.getElementById('floatingBlock');

  aboutBtn.addEventListener('click', () => {
    alert('About section coming soon');
  });

  projectsBtn.addEventListener('click', () => {
    alert('Projects section coming soon');
  });

  block.addEventListener('click', () => {
    block.style.animation = 'none';
    block.offsetHeight;
    block.style.animation = 'floatBlock 0.35s ease, shake 0.35s ease';
    setTimeout(() => {
      block.style.animation = 'floatBlock 4.2s ease-in-out infinite';
    }, 350);
  });
}

// Shake animation
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
  setupButtons();
});