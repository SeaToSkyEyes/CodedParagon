const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const signupButton = document.querySelector('.signup-button');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const signupForm = document.getElementById('signup-form');

resizeCanvas();

// Heart Particle Class
class HeartParticle {
  constructor(x, y, size, speedY, isSpastic = false) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedY = speedY;
    this.opacity = 1;
    this.isSpastic = isSpastic;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y - this.size / 2,
      this.x + this.size, this.y + this.size / 3,
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x - this.size, this.y + this.size / 3,
      this.x - this.size / 2, this.y - this.size / 2,
      this.x, this.y
    );
    ctx.fill();
  }

  update() {
    if (this.isSpastic) {
      this.x += (Math.random() - 0.5) * 20;
      this.y += (Math.random() - 0.5) * 20;
    } else {
      this.y -= this.speedY;
    }
    this.opacity -= 0.002;
  }
}

let particlesArray = [];
let spasticMode = false;

function handleParticles() {
  if (spasticMode) {
    for (let i = 0; i < 20; i++) {
      particlesArray.push(
        new HeartParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 20 + 10,
          0,
          true
        )
      );
    }
  } else {
    for (let i = 0; i < 5; i++) {
      particlesArray.push(
        new HeartParticle(
          Math.random() * canvas.width,
          canvas.height + 10,
          Math.random() * 15 + 5,
          Math.random() * 1 + 0.5
        )
      );
    }
  }

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].opacity <= 0 || particlesArray[i].y + particlesArray[i].size < 0) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

signupButton.addEventListener('click', () => {
  if (!signupButton.classList.contains('inactive')) {
    modalOverlay.style.display = 'flex';
  }
});

modalClose.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  modalOverlay.style.display = 'none';
  signupButton.textContent = '<3';
  signupButton.classList.add('inactive');
  spasticMode = true;
  setTimeout(() => {
    spasticMode = false;
  }, 2000);

  signupForm.reset();
});

const codedParagon = document.querySelector('.codedparagon');
const hoverMenu = document.querySelector('.hover-menu');

codedParagon.addEventListener('mouseenter', () => {
  hoverMenu.style.opacity = '1';
  hoverMenu.style.transform = 'translateX(-50%) translateY(0)';
});

codedParagon.addEventListener('mouseleave', () => {
  hoverMenu.style.opacity = '0';
  hoverMenu.style.transform = 'translateX(-50%) translateY(-10px)';
});

hoverMenu.addEventListener('mouseenter', () => {
  hoverMenu.style.opacity = '1';
  hoverMenu.style.transform = 'translateX(-50%) translateY(0)';
});

hoverMenu.addEventListener('mouseleave', () => {
  hoverMenu.style.opacity = '0';
  hoverMenu.style.transform = 'translateX(-50%) translateY(-10px)';
});
