const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenu = document.querySelector('.nav-links');
const progressBar = document.querySelector('.progress-bar');
const roleText = document.getElementById('role');
const revealItems = document.querySelectorAll('.reveal');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  themeToggle.textContent = '🌙';
} else {
  body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isLight = body.getAttribute('data-theme') === 'light';
  const nextTheme = isLight ? 'dark' : 'light';
  body.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  themeToggle.textContent = nextTheme === 'light' ? '🌙' : '☀️';
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const roles = ['beautiful web experiences', 'modern user interfaces', 'fast digital products'];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const current = roles[roleIndex];

  if (!deleting) {
    roleText.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 1200);
      return;
    }
    setTimeout(typeRole, 80);
  } else {
    roleText.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeRole, 60);
  }
}

setTimeout(typeRole, 800);

const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${percent}%`;

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollTop >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});
