// Hero device carousel (mobile <768px): syncs pagination dots with the scroll-snap row.
// Layout/snapping is pure CSS; this only reveals + wires the dots.
(function () {
  var stage = document.getElementById('hero-stage');
  var dotsWrap = document.querySelector('.hero-dots');
  if (!stage || !dotsWrap) return;
  var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.hero-dot'));
  var slides = [document.getElementById('hero-slide-pro'), document.getElementById('hero-slide-duo')];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var mobile = window.matchMedia('(max-width: 767px)');

  // Each slide has a different height (17 Pro is much taller than the Duo), so size the
  // row to the active slide instead of the tallest one. Avoids dead space around the Duo.
  function fitHeight(index) {
    if (!mobile.matches) { stage.style.height = ''; return; }
    var cs = getComputedStyle(stage);
    var chrome = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    stage.style.height = (slides[index].offsetHeight + chrome) + 'px';
  }

  function setActive(index) {
    fitHeight(index);
    dots.forEach(function (dot, i) {
      if (i === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      // Scroll the row itself (not scrollIntoView) so the page never jumps vertically.
      stage.scrollTo({ left: slides[i].offsetLeft - 20, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(slides.indexOf(entry.target));
      });
    }, { root: stage, threshold: 0.6 });
    slides.forEach(function (slide) { io.observe(slide); });
  }
  mobile.addEventListener('change', function () { fitHeight(0); });
  window.addEventListener('resize', function () {
    fitHeight(dots.findIndex(function (d) { return d.getAttribute('aria-current') === 'true'; }) || 0);
  });
  fitHeight(0);
  dotsWrap.hidden = false;
})();
