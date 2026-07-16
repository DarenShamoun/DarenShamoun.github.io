// Daren Shamoun portfolio — interactions (vanilla, no deps)
(function () {
  'use strict';

  // sticky nav state
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.textContent = '☰'; }
    });
  }

  // scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // dynamic year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // image lightbox (click to enlarge)
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<button class="lightbox-close" aria-label="Close preview">&times;</button>' +
                 '<img alt="">' +
                 '<div class="lightbox-hint">click anywhere or press Esc to close</div>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  var lbClose = lb.querySelector('.lightbox-close');

  function openLb(src, alt) {
    lbImg.setAttribute('src', src);
    lbImg.setAttribute('alt', alt || '');
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  lb.addEventListener('click', closeLb);
  lbImg.addEventListener('click', function (e) { e.stopPropagation(); }); // keep open when clicking the image
  lbClose.addEventListener('click', function (e) { e.stopPropagation(); closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  document.querySelectorAll('.feature-media img, .pixie-diagram img, .about-photo img').forEach(function (img) {
    img.addEventListener('click', function () { openLb(img.getAttribute('src'), img.getAttribute('alt')); });
  });
})();
