(function () {
  var heartsRoot = document.getElementById('hearts');
  var symbols = ['❤️', '💕', '💗', '💖', '🩷', '🌷', '🌸', '✨', '💞', '🌹'];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  function getLang() {
    try {
      return localStorage.getItem('bd-lang') || 'ru';
    } catch (e) {
      return 'ru';
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem('bd-lang', lang);
    } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    var nodes = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < nodes.length; i++) {
      var elLang = nodes[i].getAttribute('data-lang');
      if (elLang === lang) {
        nodes[i].classList.remove('lang-hidden');
      } else {
        nodes[i].classList.add('lang-hidden');
      }
    }
    var switchers = document.querySelectorAll('[data-set-lang]');
    for (var j = 0; j < switchers.length; j++) {
      if (switchers[j].getAttribute('data-set-lang') === lang) {
        switchers[j].classList.add('active');
      } else {
        switchers[j].classList.remove('active');
      }
    }
  }

  function initHearts() {
    if (!heartsRoot || reduceMotion) return;

    var count = isMobile ? 6 : 10;

    function spawnHeart(delay) {
      window.setTimeout(function () {
        var el = document.createElement('span');
        el.className = 'heart';
        el.setAttribute('aria-hidden', 'true');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = 14 + Math.random() * (isMobile ? 18 : 24) + 'px';
        el.style.animationDuration = 7 + Math.random() * 7 + 's';
        el.style.opacity = String(0.55 + Math.random() * 0.4);
        heartsRoot.appendChild(el);
        window.setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 16000);
      }, delay);
    }

    for (var i = 0; i < count; i++) {
      spawnHeart(i * 350);
    }

    var interval = isMobile ? 1100 : 800;
    window.setInterval(function () {
      spawnHeart(0);
    }, interval);
  }

  function initLangUI() {
    applyLang(getLang());

    var switchers = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < switchers.length; i++) {
      switchers[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-set-lang'));
      });
    }

    var openBtn = document.getElementById('open-btn');
    var langChoice = document.getElementById('lang-choice');
    if (openBtn && langChoice) {
      openBtn.addEventListener('click', function () {
        langChoice.classList.remove('hidden');
        langChoice.classList.add('pop-in');
        openBtn.classList.add('hidden');
      });
    }

    var pickBtns = document.querySelectorAll('[data-pick-lang]');
    var overlay = document.getElementById('unlock-overlay');
    var counter = document.getElementById('countdown-num');
    for (var p = 0; p < pickBtns.length; p++) {
      pickBtns[p].addEventListener('click', function () {
        var lang = this.getAttribute('data-pick-lang');
        setLang(lang);
        if (!overlay) {
          window.location.href = './birthday.html';
          return;
        }
        overlay.classList.remove('hidden');
        var n = 3;
        if (counter) counter.textContent = String(n);
        var timer = window.setInterval(function () {
          n -= 1;
          if (n > 0) {
            if (counter) counter.textContent = String(n);
          } else {
            window.clearInterval(timer);
            window.location.href = './birthday.html';
          }
        }, 550);
      });
    }
  }

  document.addEventListener('click', function (e) {
    var target = e.target;
    while (target && target !== document) {
      if (target.matches && target.matches('a, button')) {
        target.classList.add('btn-press', 'scale-[0.97]');
        window.setTimeout(function () {
          target.classList.remove('scale-[0.97]');
        }, 160);
        break;
      }
      target = target.parentNode;
    }
  });

  initHearts();
  initLangUI();
})();
