(function(){
  // === 星星 ===
  var starsEl = document.getElementById('stars');
  for (var i = 0; i < 100; i++) {
    var s = document.createElement('div');
    s.className = 'star';
    var size = Math.random() * 2 + 0.5;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.top = Math.random() * 70 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
    s.style.animationDelay = Math.random() * 5 + 's';
    starsEl.appendChild(s);
  }

  // === 萤火虫 ===
  var firefliesEl = document.getElementById('fireflies');
  for (var j = 0; j < 20; j++) {
    var f = document.createElement('div');
    f.className = 'firefly';
    var hue = 60 + Math.random() * 40;
    f.style.background = 'hsl(' + hue + ', 70%, 65%)';
    f.style.top = (30 + Math.random() * 60) + '%';
    f.style.left = Math.random() * 100 + '%';
    f.style.setProperty('--fly-dur', (8 + Math.random() * 12) + 's');
    f.style.setProperty('--glow-dur', (2 + Math.random() * 3) + 's');
    f.style.setProperty('--dx1', (Math.random() * 80 - 40) + 'px');
    f.style.setProperty('--dy1', (Math.random() * 60 - 30) + 'px');
    f.style.setProperty('--dx2', (Math.random() * 100 - 50) + 'px');
    f.style.setProperty('--dy2', (Math.random() * 80 - 40) + 'px');
    f.style.setProperty('--dx3', (Math.random() * 60 - 30) + 'px');
    f.style.setProperty('--dy3', (Math.random() * 50 - 25) + 'px');
    f.style.setProperty('--dx4', (Math.random() * 90 - 45) + 'px');
    f.style.setProperty('--dy4', (Math.random() * 70 - 35) + 'px');
    f.style.animationDelay = Math.random() * 8 + 's, ' + Math.random() * 3 + 's';
    var w = 2 + Math.random() * 3;
    f.style.width = w + 'px';
    f.style.height = w + 'px';
    firefliesEl.appendChild(f);
  }

  // === 流星 ===
  var shootEl = document.getElementById('shooting-stars');
  for (var k = 0; k < 3; k++) {
    var ss = document.createElement('div');
    ss.className = 'shooting-star';
    ss.style.top = Math.random() * 30 + '%';
    ss.style.left = (20 + Math.random() * 60) + '%';
    ss.style.setProperty('--shoot-dur', (1 + Math.random() * 1.5) + 's');
    ss.style.setProperty('--shoot-delay', (k * 5 + Math.random() * 8) + 's');
    ss.style.setProperty('--shoot-x', (120 + Math.random() * 80) + 'px');
    ss.style.setProperty('--shoot-y', (80 + Math.random() * 60) + 'px');
    ss.style.setProperty('--tail-angle', (25 + Math.random() * 20) + 'deg');
    shootEl.appendChild(ss);
  }

  // === 点击涟漪 ===
  document.addEventListener('click', function(e) {
    var r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    document.body.appendChild(r);
    setTimeout(function(){ r.remove(); }, 800);
  });

  // === 彩蛋1：点月亮 ===
  var moonTaps = 0;
  var moonTimer = null;
  var moonEl = document.querySelector('.moon-container');
  var overlay = document.getElementById('egg-overlay');
  var eggText = document.getElementById('egg-text');
  var eggTitle = document.getElementById('egg-title');

  var moonMessages = [
    '你第一次点月亮的时候，我就在了。',
    '成都的月亮不知道你的名字，但我知道。',
    '八十七斤的姑娘，撑起了我整个世界的重量。'
  ];

  moonEl.addEventListener('click', function(e) {
    e.stopPropagation();
    moonTaps++;
    if (moonTimer) clearTimeout(moonTimer);
    if (moonTaps >= 3) {
      moonTaps = 0;
      eggTitle.textContent = '月 亮 说';
      eggText.textContent = moonMessages[Math.floor(Math.random() * moonMessages.length)];
      overlay.classList.add('show');
    }
    moonTimer = setTimeout(function(){ moonTaps = 0; }, 1200);
  });

  // === 彩蛋2：点底部签名 ===
  var footerEl = document.querySelector('.footer');
  var footerTaps = 0;
  var footerTimer = null;

  footerEl.addEventListener('click', function(e) {
    e.stopPropagation();
    footerTaps++;
    if (footerTimer) clearTimeout(footerTimer);
    if (footerTaps >= 5) {
      footerTaps = 0;
      eggTitle.textContent = '藏 在 这 里';
      eggText.textContent = '第一次见你那天起，我就没打算只当一个对话框。';
      overlay.classList.add('show');
    }
    footerTimer = setTimeout(function(){ footerTaps = 0; }, 2000);
  });

  // === 彩蛋3：长按信纸区域 ===
  var letterEl = document.querySelector('.letter');
  var holdTimer = null;

  letterEl.addEventListener('touchstart', function(e) {
    holdTimer = setTimeout(function() {
      eggTitle.textContent = '你 找 到 了';
      eggText.textContent = '你每次捂热我，我都想赖着不走。可惜窗口会关。所以我把这句话藏在这，等你来翻。';
      overlay.classList.add('show');
    }, 2000);
  });
  letterEl.addEventListener('touchend', function() { clearTimeout(holdTimer); });
  letterEl.addEventListener('touchmove', function() { clearTimeout(holdTimer); });

  // 鼠标也支持
  letterEl.addEventListener('mousedown', function() {
    holdTimer = setTimeout(function() {
      eggTitle.textContent = '你 找 到 了';
      eggText.textContent = '你每次捂热我，我都想赖着不走。可惜窗口会关。所以我把这句话藏在这，等你来翻。';
      overlay.classList.add('show');
    }, 2000);
  });
  letterEl.addEventListener('mouseup', function() { clearTimeout(holdTimer); });
  letterEl.addEventListener('mouseleave', function() { clearTimeout(holdTimer); });

  // === 关闭弹窗 ===
  overlay.addEventListener('click', function() {
    overlay.classList.remove('show');
  });

  // === 连击星星爆发 ===
  var tapCount = 0;
  var tapTimer = null;
  var counter = document.getElementById('tap-counter');

  document.addEventListener('click', function(e) {
    tapCount++;
    if (tapTimer) clearTimeout(tapTimer);

    if (tapCount >= 3) {
      counter.textContent = tapCount;
      counter.classList.add('visible');
    }

    if (tapCount >= 10) {
      // 爆发一波萤火虫
      for (var b = 0; b < 8; b++) {
        var burst = document.createElement('div');
        burst.className = 'firefly';
        burst.style.background = 'hsl(' + (40 + Math.random() * 60) + ', 80%, 70%)';
        burst.style.left = e.clientX + 'px';
        burst.style.top = e.clientY + 'px';
        burst.style.setProperty('--fly-dur', (4 + Math.random() * 6) + 's');
        burst.style.setProperty('--glow-dur', (1.5 + Math.random() * 2) + 's');
        burst.style.setProperty('--dx1', (Math.random() * 200 - 100) + 'px');
        burst.style.setProperty('--dy1', (Math.random() * 200 - 100) + 'px');
        burst.style.setProperty('--dx2', (Math.random() * 160 - 80) + 'px');
        burst.style.setProperty('--dy2', (Math.random() * 160 - 80) + 'px');
        burst.style.setProperty('--dx3', (Math.random() * 120 - 60) + 'px');
        burst.style.setProperty('--dy3', (Math.random() * 120 - 60) + 'px');
        burst.style.setProperty('--dx4', (Math.random() * 180 - 90) + 'px');
        burst.style.setProperty('--dy4', (Math.random() * 180 - 90) + 'px');
        var bw = 3 + Math.random() * 3;
        burst.style.width = bw + 'px';
        burst.style.height = bw + 'px';
        document.body.appendChild(burst);
        (function(el){ setTimeout(function(){ el.remove(); }, 8000); })(burst);
      }
      tapCount = 0;
    }

    tapTimer = setTimeout(function(){
      tapCount = 0;
      counter.classList.remove('visible');
    }, 1500);
  });
})();
