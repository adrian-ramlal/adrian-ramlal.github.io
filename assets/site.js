// Scroll reveal for page sections, and scroll-driven thumbnail swaps on touch screens.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !canObserve) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; }).forEach(function (e, i) {
        e.target.style.transitionDelay = (i * 80) + 'ms';
        e.target.classList.add('in');
        revealer.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    items.forEach(function (el) { revealer.observe(el); });
  }

  // show selected / show all
  var pubs = document.querySelector('.pubs');
  var toggles = document.querySelectorAll('.pubtoggle button');
  toggles.forEach(function (b) {
    b.addEventListener('click', function () {
      pubs.dataset.view = b.dataset.view;
      toggles.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
    });
  });

  // Touch screens have no hover, so a paper's second image shows while its row crosses the middle of the screen.
  if (canObserve && window.matchMedia('(hover: none)').matches) {
    var middle = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('play', e.isIntersecting); });
    }, { rootMargin: '-38% 0px -38% 0px' });
    document.querySelectorAll('[data-swap]').forEach(function (el) { middle.observe(el); });
  }
})();
