// Scroll reveal for page sections, and the selected/all toggle for papers.
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
})();
