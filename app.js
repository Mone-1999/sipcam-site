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
let menuMotion = null;
let menuRevision = 0;
const animateMenu = (opening) => {
  const revision = ++menuRevision;
  const from = menuMotion ? getComputedStyle(menu).transform : (opening ? 'translateX(-100%)' : 'translateX(0)');
  menuMotion?.cancel();
  menuMotion = null;
  const finish = () => {
    if (revision !== menuRevision) return;
    menuMotion = null;
    if (!opening && menu.open) menu.close();
  };
  if (reducedMotion.matches || !menu.animate) { finish(); return; }
  menuMotion = menu.animate(
    [{transform: from}, {transform: opening ? 'translateX(0)' : 'translateX(-100%)'}],
    {duration: opening ? 420 : 300, easing: opening ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.4,0,1,1)', fill: 'forwards'}
  );
  const animation = menuMotion;
  animation.finished.then(() => { finish(); animation.cancel(); }, () => {});
};
toggle.addEventListener('click', () => {
  if (!menu.open) menu.showModal();
  toggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
  animateMenu(true);
});
const closeMenu = () => { if (menu.open) animateMenu(false); };
menu.querySelector('.menu-close').addEventListener('click', closeMenu);
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
menu.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
menu.addEventListener('click', event => {
  const rect = menu.getBoundingClientRect();
  if (event.target === menu && (event.clientX < rect.left || event.clientX > rect.right)) closeMenu();
});
menu.addEventListener('close', () => {
  ++menuRevision;
  menuMotion?.cancel();
  menuMotion = null;
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  toggle.focus({preventScroll: true});
});
reducedMotion.addEventListener('change', event => { if (event.matches) menuMotion?.finish(); });
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
