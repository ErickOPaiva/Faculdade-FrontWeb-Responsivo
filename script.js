function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

const titleEl = document.querySelector('.h1-main');
const originalText = titleEl ? titleEl.textContent : '';
const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234!@#$';

function glitchText(el, original, duration = 600) {
  let start = null;
  const totalFrames = duration / 16;

  function frame(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;

    if (progress < 1) {

      const revealed = Math.floor(progress * original.length);
      let result = '';
      for (let i = 0; i < original.length; i++) {
        if (original[i] === ' ') { result += ' '; continue; }
        if (i < revealed) {
          result += original[i];
        } else {
          result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      el.textContent = result;
      requestAnimationFrame(frame);
    } else {
      el.textContent = original;
    }
  }
  requestAnimationFrame(frame);
}

if (titleEl) {
  titleEl.textContent = glitchChars.slice(0, originalText.length);
  setTimeout(() => glitchText(titleEl, originalText, 900), 200);
}

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  const sigla = card.querySelector('.sigla');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x);
    card.style.setProperty('--my', y);
  });

  card.addEventListener('mouseenter', () => {
    if (sigla) sigla.style.transform = 'scale(1.08)';
    if (sigla) sigla.style.transition = 'transform .2s ease';
  });

  card.addEventListener('mouseleave', () => {
    if (sigla) sigla.style.transform = 'scale(1)';
  });
});

if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 6px; height: 6px;
    background: #c8ff00;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform .1s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = (e.clientX - 3) + 'px';
    cursor.style.top  = (e.clientY - 3) + 'px';
  });

  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(4)';
    });
    c.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}

console.log(
  '%c BR · ESTADOS \n%c HTML + CSS + JS · Portfolio',
  'background:#c8ff00;color:#0d0d0d;font-weight:bold;font-size:16px;padding:6px 16px;',
  'color:#c8ff00;font-size:11px;'
);