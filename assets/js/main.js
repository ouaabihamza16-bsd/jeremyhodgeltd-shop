/* Jeremy Hodge Ltd: mobile menu, header shadow and footer year. */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var header = document.querySelector('.site-header');

  // Mobile menu
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a section
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    // Close with Escape and return focus to the toggle
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when tapping outside the header
    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') === 'true' && header && !header.contains(event.target)) {
        setOpen(false);
      }
    });

    // Reset when switching to the desktop layout
    var desktop = window.matchMedia('(min-width: 820px)');
    var onChange = function (mq) {
      if (mq.matches) {
        setOpen(false);
      }
    };
    if (desktop.addEventListener) {
      desktop.addEventListener('change', onChange);
    } else if (desktop.addListener) {
      desktop.addListener(onChange);
    }
  }

  // Header shadow once the page scrolls
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Keep the copyright year current
  var years = document.querySelectorAll('[data-year]');
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = String(new Date().getFullYear());
  }
})();
