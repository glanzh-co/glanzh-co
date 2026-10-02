/* ==========================================================================
   Main Application Scripts
   ========================================================================== */

// ---------------------------------------------------------
// 1. Swiper Slides Accessibility Patch
// ---------------------------------------------------------
(function() {
    function fixBadRoles(ctx) {
        (ctx || document).querySelectorAll('img.swiper-slide[role]').forEach(function(el) {
            el.removeAttribute('role');
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        fixBadRoles(document);
    });

    window.addEventListener('load', function() {
        fixBadRoles(document);
    });

    if ('MutationObserver' in window) {
        var mo = new MutationObserver(function() {
            fixBadRoles(document);
        });
        mo.observe(document, {
            subtree: true,
            attributes: true,
            attributeFilter: ['role', 'class']
        });
    }
})();

// ---------------------------------------------------------
// 2. Smooth Scrolling for Internal Navigation Links
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                var targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    var canvasNav = document.getElementById('canvas-nav');
                    var canvasOverlay = document.querySelector('.canvas-nav-overlay');
                    var canvasIcon = document.querySelector('.canvas-navi-icon');
                    if (canvasNav && canvasNav.classList.contains('open')) {
                        canvasNav.classList.remove('open');
                        if (canvasOverlay) canvasOverlay.classList.remove('open');
                        if (canvasIcon) canvasIcon.classList.remove('active');
                    }
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ---------------------------------------------------------
// 3. Visual Composer Animation & ScrollTrigger Sync
// ---------------------------------------------------------
(function() {
    function checkAnimations() {
        document.querySelectorAll('.wpb_animate_when_almost_visible').forEach(function(el) {
            el.classList.add('wpb_start_animation', 'animated');
        });
    }

    function initSlidersFailSafe() {
        if (typeof Swiper !== 'undefined') {
            // Projects Slider
            if (document.querySelector('.projekte-slider:not(.swiper-initialized)')) {
                try {
                    new Swiper('.projekte-slider', {
                        centeredSlides: false,
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        mousewheel: { forceToAxis: true },
                        loop: false,
                        speed: 700,
                        navigation: {
                            nextEl: '.projekte-slider .swiper-button-next',
                            prevEl: '.projekte-slider .swiper-button-prev'
                        }
                    });
                } catch(e) {}
            }

            // Testimonials Slider
            document.querySelectorAll('.testimonials-slider:not(.swiper-initialized)').forEach(function(el, idx) {
                try {
                    el.classList.add('slideid-' + idx);
                    new Swiper(el, {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        loop: false,
                        mousewheel: { forceToAxis: true },
                        speed: 1000,
                        autoplay: false,
                        navigation: {
                            nextEl: el.querySelector('.swiper-button-next') || '.testimonials-slider .swiper-button-next',
                            prevEl: el.querySelector('.swiper-button-prev') || '.testimonials-slider .swiper-button-prev'
                        }
                    });
                } catch(e) {}
            });

            // Post / Blog Slider
            if (document.querySelector('.post-slider:not(.swiper-initialized)')) {
                try {
                    document.querySelectorAll('.post-slider .swiper-wrapper > article').forEach(function(art) {
                        art.classList.add('swiper-slide');
                    });
                    new Swiper('.post-slider', {
                        centeredSlides: false,
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        a11y: false,
                        mousewheel: { forceToAxis: true },
                        loop: false,
                        speed: 700,
                        navigation: {
                            nextEl: '.post-slider .swiper-button-next',
                            prevEl: '.post-slider .swiper-button-prev'
                        }
                    });
                } catch(e) {}
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            checkAnimations();
            initSlidersFailSafe();
        });
    } else {
        checkAnimations();
        initSlidersFailSafe();
    }

    window.addEventListener('scroll', checkAnimations, { passive: true });
    window.addEventListener('resize', checkAnimations, { passive: true });
    window.addEventListener('load', function() {
        checkAnimations();
        initSlidersFailSafe();
        if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
        }
    });
})();
