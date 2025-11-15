// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Toggle do menu hambúrguer com acessibilidade
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isExpanded = navLinks.classList.toggle('active');
  toggle.setAttribute('aria-expanded', isExpanded);
});

// Animação de contadores com Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".contador");
  const options = {
    threshold: 0.6
  };

  const animateCounter = (el) => {
    if (el.dataset.animated === "true") return;

    const target = +el.getAttribute("data-target");
    const isPercent = el.textContent.includes("%");
    const isDias = el.textContent.toLowerCase().includes("dias");
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    el.dataset.animated = "true";

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = isDias ? `${value} dias` : `${value}%`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});