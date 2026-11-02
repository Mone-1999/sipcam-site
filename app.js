const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const reveals = [...document.querySelectorAll('[data-reveal]')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    let order = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--delay', `${Math.min(order++ * .1, .3)}s`);
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {threshold: .12, rootMargin: '0px 0px -24px 0px'});
  reveals.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); reveals.forEach(el => el.classList.add('is-visible')); }
  });
}
const menu = document.querySelector('#menu');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { menu.showModal(); toggle.setAttribute('aria-expanded','true'); document.body.classList.add('menu-open'); });
const closeMenu = () => menu.close();
menu.querySelector('.menu-close').addEventListener('click', closeMenu);
menu.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
menu.addEventListener('click', event => { if (event.target === menu && event.clientX > menu.getBoundingClientRect().right) closeMenu(); });
menu.addEventListener('close', () => { toggle.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); toggle.focus({preventScroll:true}); });
document.querySelectorAll('[data-slide]').forEach(button => {
  const track = document.getElementById(button.dataset.target);
  button.addEventListener('click', () => {
    const step = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    track.scrollBy({left: Number(button.dataset.slide) * step, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  });
  const update = () => { button.disabled = button.dataset.slide === '-1' ? track.scrollLeft < 2 : track.scrollLeft >= track.scrollWidth - track.clientWidth - 2; };
  track.addEventListener('scroll', update, {passive:true});
  new ResizeObserver(update).observe(track);
  update();
});
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.form-status').textContent = 'Это предварительный просмотр: сообщение не отправлено. Связаться с нами можно по адресу info@sipcam.ru.';
});

// Native sticky scrolling: no scroll hijacking, timers, or animation library.
const microStory = document.querySelector('.micro-story');
const microDesktop = matchMedia('(min-width: 901px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)');
let microFrame = 0;
const clamp = value => Math.max(0, Math.min(1, value));
function paintMicroplus() {
  microFrame = 0;
  if (!microDesktop.matches) return;
  const bounds = microStory.getBoundingClientRect();
  const travel = bounds.height - window.innerHeight;
  const progress = clamp(-bounds.top / Math.max(1, travel));
  microStory.style.setProperty('--micro-progress', progress.toFixed(4));
  microStory.style.setProperty('--orb-turn', `${-12 + progress * 62}deg`);
  microStory.style.setProperty('--orb-scale', (1 + Math.sin(progress * Math.PI) * .035).toFixed(4));
  [0, .29, .58].forEach((start, i) => microStory.style.setProperty(`--pair-${i}`, clamp((progress - start) / .15).toFixed(4)));
}
function requestMicroplus() { if (microDesktop.matches && !microFrame) microFrame = requestAnimationFrame(paintMicroplus); }
function configureMicroplus() {
  microStory.classList.toggle('scroll-ready', microDesktop.matches);
  if (!microDesktop.matches) {
    microStory.style.removeProperty('--orb-turn');
    microStory.style.removeProperty('--orb-scale');
  }
  requestMicroplus();
}
microDesktop.addEventListener('change', configureMicroplus);
window.addEventListener('scroll', requestMicroplus, {passive:true});
window.addEventListener('resize', requestMicroplus, {passive:true});
configureMicroplus();

// Product information is copied from the approved source HTML.
const productDetails = document.querySelector('#product-details');
const productContent = productDetails.querySelector('.product-detail-content');
let productTrigger = null;
let productClosing = false;
let productCloseTimer;
document.querySelectorAll('.product-open').forEach(button => {
  button.addEventListener('click', () => {
    productTrigger = button;
    productContent.replaceChildren(document.querySelector('#product-detail-' + button.dataset.product).content.cloneNode(true));
    productClosing = false;
    clearTimeout(productCloseTimer);
    productDetails.showModal();
    document.body.classList.add('product-detail-open');
    productDetails.scrollTop = 0;
    // Commit the offscreen starting position before the entry transition.
    productDetails.getBoundingClientRect();
    productDetails.classList.add('is-open');
  });
});
function finishProductClose() {
  clearTimeout(productCloseTimer);
  if (productDetails.open) productDetails.close();
}
function closeProductDetails() {
  if (productClosing || !productDetails.open) return;
  productClosing = true;
  productDetails.classList.remove('is-open');
  if (reducedMotion.matches) finishProductClose();
  else productCloseTimer = setTimeout(finishProductClose, 500);
}
productDetails.querySelector('.product-close').addEventListener('click', closeProductDetails);
productDetails.addEventListener('cancel', event => { event.preventDefault(); closeProductDetails(); });
productDetails.addEventListener('click', event => {
  const rect = productDetails.getBoundingClientRect();
  if (event.target === productDetails && (event.clientX < rect.left || event.clientX > rect.right)) closeProductDetails();
});
productDetails.addEventListener('transitionend', event => {
  if (productClosing && event.target === productDetails && event.propertyName === 'transform') finishProductClose();
});
productDetails.addEventListener('close', () => {
  clearTimeout(productCloseTimer);
  productClosing = false;
  productDetails.classList.remove('is-open');
  document.body.classList.remove('product-detail-open');
  productTrigger?.focus({preventScroll:true});
});
