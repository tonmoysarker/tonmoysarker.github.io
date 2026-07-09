/* ============================================================
   Terminal Portfolio - Single File (No Modules)
   Works with file:// protocol
   ============================================================ */

/* ---- Matrix Rain ---- */
class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    this.animationId = null;
    this.lastTime = 0;
    this.frameInterval = 1000 / 30;
  }
  init() {
    this.resize();
    this.drops = Array(this.columns).fill(1);
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  }
  draw(timestamp) {
    this.animationId = requestAnimationFrame((t) => this.draw(t));
    const dt = timestamp - this.lastTime;
    if (dt < this.frameInterval) return;
    this.lastTime = timestamp - (dt % this.frameInterval);
    this.ctx.fillStyle = 'rgba(10, 15, 10, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffb000';
    this.ctx.font = this.fontSize + 'px JetBrains Mono, monospace';
    for (let i = 0; i < this.drops.length; i++) {
      var ch = this.chars[Math.floor(Math.random() * this.chars.length)];
      var x = i * this.fontSize;
      var y = this.drops[i] * this.fontSize;
      this.ctx.fillText(ch, x, y);
      if (y > this.canvas.height && Math.random() > 0.975) this.drops[i] = 0;
      this.drops[i]++;
    }
  }
  start() { if (!this.animationId) this.draw(0); }
  stop() { if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; } }
}

/* ---- CRT Effects ---- */
class CRTEffects {
  constructor() {
    this.overlay = document.querySelector('.crt-overlay');
    this.isGlitching = false;
    this.glitchTimeout = null;
  }
  init() {
    var self = this;
    setInterval(function() { if (Math.random() > 0.95) self.triggerGlitch(); }, 3000);
  }
  triggerGlitch() {
    if (this.isGlitching) return;
    this.isGlitching = true;
    document.body.classList.add('glitch');
    var self = this;
    clearTimeout(this.glitchTimeout);
    this.glitchTimeout = setTimeout(function() {
      document.body.classList.remove('glitch');
      self.isGlitching = false;
    }, 300);
  }
}

/* ---- Commands ---- */
var commands = {
  help: {
    execute: function() {
      return '<span class="section-header">Available commands:</span>\n' +
        '  <span class="highlight">help</span>      - Show this help message\n' +
        '  <span class="highlight">about</span>     - About me\n' +
        '  <span class="highlight">projects</span>  - View my projects\n' +
        '  <span class="highlight">skills</span>    - Technical skills\n' +
        '  <span class="highlight">contact</span>   - Get in touch\n' +
        '  <span class="highlight">clear</span>     - Clear terminal\n' +
        '  <span class="highlight">neofetch</span>  - System info\n' +
        '  <span class="highlight">matrix</span>    - Toggle matrix rain\n' +
        '  <span class="highlight">whoami</span>    - Who am I?\n' +
        '  <span class="highlight">ls</span>        - List directory\n' +
        '  <span class="highlight">pwd</span>       - Print working directory\n' +
        '  <span class="highlight">date</span>      - Show current date\n' +
        '  <span class="highlight">history</span>   - Command history\n' +
        '  <span class="highlight">sudo</span>      - Superuser do\n' +
        '  <span class="highlight">exit</span>      - Close session';
    }
  },
  about: {
    execute: function() {
      return '<span class="command-prefix">&gt; whoami</span>\n\n' +
        '<span class="success">Tonmoy Sarker</span>\n' +
        '<span class="highlight">Front-End Developer</span>\n\n' +
        'Building beautiful and functional web experiences.\n' +
        'I craft interfaces that are both visually striking and\n' +
        'technically sound. Specializing in modern web technologies\n' +
        'with a passion for clean, efficient code.\n\n' +
        'Currently learning: <span class="success">React</span>\n' +
        'Location: <span class="highlight">Bangladesh</span>\n' +
        'Status: <span class="success">Available for opportunities</span>';
    }
  },
  projects: {
    execute: function() {
      return '<span class="command-prefix">&gt; ls -la projects/</span>\n\n' +
        '<span class="project-card"><span class="project-title">Portfolio Terminal</span>\n' +
        '  <span class="project-desc">This very portfolio - a retro-futuristic terminal experience</span>\n' +
        '  <span class="project-tech">[HTML5] [CSS3] [JavaScript] [Canvas API]</span></span>\n\n' +
        '<span class="project-card"><span class="project-title">Vue Todo App</span>\n' +
        '  <span class="project-desc">A responsive todo application with local storage persistence</span>\n' +
        '  <span class="project-tech">[Vue.js] [JavaScript] [CSS3]</span></span>\n\n' +
        '<span class="project-card"><span class="project-title">Responsive Website</span>\n' +
        '  <span class="project-desc">Modern responsive website with mobile-first design</span>\n' +
        '  <span class="project-tech">[HTML5] [CSS3] [JavaScript]</span></span>';
    }
  },
  skills: {
    execute: function() {
      return '<span class="command-prefix">&gt; cat skills.txt</span>\n\n' +
        '<span class="skills-grid">' +
        '<span class="skill-tag">HTML5</span>' +
        '<span class="skill-tag">CSS3</span>' +
        '<span class="skill-tag">JavaScript</span>' +
        '<span class="skill-tag">Vue.js</span>' +
        '<span class="skill-tag">React</span>' +
        '<span class="skill-tag">Git</span>' +
        '<span class="skill-tag">Responsive Design</span>' +
        '<span class="skill-tag">UI/UX</span>' +
        '<span class="skill-tag">Performance</span>' +
        '<span class="skill-tag">Accessibility</span>' +
        '</span>';
    }
  },
  contact: {
    execute: function() {
      return '<span class="command-prefix">&gt; ssh contact@tonmoy</span>\n\n' +
        'Establishing connection to github.com/tonmoysarker...\n' +
        '<span class="success">Connection established.</span>\n\n' +
        '<span class="contact-link"><a href="https://github.com/tonmoysarker" target="_blank" rel="noopener">GitHub: github.com/tonmoysarker</a></span>\n' +
        '<span class="contact-link"><a href="mailto:tonmoysarker6302@gmail.com">Email: tonmoysarker6302@gmail.com</a></span>\n' +
        '<span class="contact-link"><a href="https://www.linkedin.com/in/tonmoy-sarker-6302/" target="_blank" rel="noopener">LinkedIn: linkedin.com/in/tonmoy-sarker-6302</a></span>';
    }
  },
  clear: { execute: function() { return '__CLEAR__'; } },
  neofetch: {
    execute: function() {
      return '<pre class="ascii-art">' +
'          .-/+oossssoo+/-.          <span class="success">tonmoy@portfolio</span>\n' +
'      `:+ssssssssssssssssss+:`      <span class="highlight">----------------</span>\n' +
'    -+ssssssssssssssssssyyssss+-    OS: PortfolioOS 1.0.0\n' +
'  .ossssssssssssssssssdMMMNysssso.  Host: tonmoysarker.github.io\n' +
' /ssssssssssshdmmNNmmyNMMMMhssssss/ Kernel: VanillaJS 1.0\n' +
'+ssssssssshmydMMMMMMMNddddyssssssss+ Shell: terminal-portfolio\n' +
'/sssssssshNMMMyhhyyyyhmNMMMNhssssssss Resolution: Responsive\n' +
'.ssssssssdMMMNhsssssssssshNMMMdssssss. Theme: Amber CRT\n' +
'+sssshhhyNMMNyssssssssssssyNMMMysssss+ Font: JetBrains Mono\n' +
' ossyNMMMNyMMhsssssssssssssshmmmhssssso\n' +
'  +sssshhhyNMMNyssssssssssssyNMMMysssss+\n' +
'   .ossssssssdMMMNhsssssssssshNMMMdssssss.\n' +
'    /ssssssssshNMMMyhhyyyyhdNMMMNhssssssss/\n' +
'     +sssssssssdmydMMMMMMMMddddyssssssssss+\n' +
'      /ssssssssssshdmNNNNmyNMMMMhssssss/\n' +
'       .ossssssssssssssssssdMMMNysssso.\n' +
'         -+sssssssssssssssssyyyssss+-\n' +
'           `:+ssssssssssssssssss+:`\n' +
'               .-/+oossssoo+/-.</pre>';
    }
  },
  whoami: {
    execute: function() {
      return '<span class="success">tonmoy</span>\n<span class="highlight">Front-End Developer</span>\nPortfolio: tonmoysarker.github.io';
    }
  },
  ls: {
    execute: function() {
      return '<span class="highlight">drwxr-xr-x</span>  projects/\n<span class="highlight">drwxr-xr-x</span>  skills/\n<span class="output">-rw-r--r--</span>  about.md\n<span class="output">-rw-r--r--</span>  contact.txt\n<span class="output">-rw-r--r--</span>  readme.md';
    }
  },
  pwd: { execute: function() { return '/home/tonmoy/portfolio'; } },
  date: { execute: function() { return new Date().toString(); } },
  uptime: { execute: function() { return 'up since portfolio creation, 1 user, load average: 0.00, 0.01, 0.05'; } },
  sudo: {
    execute: function() {
      return '<span class="error">[sudo] password for tonmoy: </span>\n<span class="error">Sorry, user tonmoy is not in the sudoers file. This incident will be reported.</span>';
    }
  },
  exit: {
    execute: function() {
      return '<span class="output">Connection to portfolio closed.</span>\n<span class="success">Thank you for visiting!</span>';
    }
  }
};

function getCommand(name) {
  var cmd = name.toLowerCase().trim();
  return commands[cmd] || null;
}

/* ---- Boot Sequence ---- */
class BootSequence {
  constructor(outputEl) {
    this.outputEl = outputEl;
    this.messages = [
      { text: 'BIOS v2.4.1 - Tonmoy Systems', delay: 40 },
      { text: 'Memory Test: 640K OK', delay: 50 },
      { text: 'Initializing Terminal Interface...', delay: 40 },
      { text: 'Loading portfolio.kernel...', delay: 40 },
      { text: 'Mounting /dev/skills...', delay: 30 },
      { text: 'Starting services...', delay: 30 },
      { text: '', delay: 10 },
      { text: '[  OK  ] Network interfaces ready', delay: 20 },
      { text: '[  OK  ] Developer profile loaded', delay: 20 },
      { text: '[  OK  ] Portfolio system ready', delay: 20 },
      { text: '', delay: 10 },
      { text: 'Welcome to tonmoy@portfolio v1.0.0', delay: 30 },
      { text: 'Type "help" for available commands', delay: 20 },
      { text: '', delay: 10 }
    ];
  }
  async run(skip) {
    if (skip) {
      this.addLine('Welcome back! Resuming session...', '');
      return;
    }
    for (var i = 0; i < this.messages.length; i++) {
      var msg = this.messages[i];
      await this.typeLine(msg.text, msg.delay);
    }
  }
  addLine(text, cls) {
    var line = document.createElement('div');
    line.className = 'output-line';
    if (cls) line.classList.add(cls);
    line.textContent = text || '\u00a0';
    this.outputEl.appendChild(line);
    return line;
  }
  typeLine(text, delay) {
    var self = this;
    return new Promise(function(resolve) {
      var line = document.createElement('div');
      line.className = 'output-line';
      if (text.indexOf('[  OK  ]') !== -1) line.classList.add('success');
      self.outputEl.appendChild(line);
      if (!text) { line.innerHTML = '&nbsp;'; setTimeout(resolve, delay); return; }
      var i = 0;
      var iv = setInterval(function() {
        if (i < text.length) { line.textContent += text[i]; i++; }
        else { clearInterval(iv); setTimeout(resolve, delay); }
      }, 12);
    });
  }
}

/* ---- Main Portfolio ---- */
(function() {
  var outputEl = document.getElementById('terminal-output');
  var inputEl = document.getElementById('command-input');
  var inputLine = document.getElementById('input-line');
  var canvas = document.getElementById('matrix-canvas');

  var boot = new BootSequence(outputEl);
  var matrix = new MatrixRain(canvas);
  var crt = new CRTEffects();

  var commandHistory = [];
  var historyIndex = -1;
  var matrixEnabled = false;

  var konamiCode = [];
  var konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];

  function onMobileResize() {
    var body = document.querySelector('.terminal-body');
    if (!body) return;
    var offset = body.getBoundingClientRect().top;
    var avail = window.innerHeight - offset;
    body.style.minHeight = avail + 'px';
    body.style.maxHeight = avail + 'px';
  }

  function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

  function appendOutput(content, cls) {
    if (!content) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'output-line';
    if (cls) wrapper.classList.add(cls);
    if (cls === 'command') {
      wrapper.textContent = content;
    } else {
      wrapper.innerHTML = content;
    }
    outputEl.appendChild(wrapper);
  }

  function scrollToBottom() {
    var body = document.querySelector('.terminal-body');
    body.scrollTop = body.scrollHeight;
  }

  function executeCommand(command) {
    appendOutput('tonmoy@portfolio:~$ ' + command, 'command');
    var cmd = getCommand(command);
    if (cmd) {
      var result = cmd.execute();
      if (result === '__CLEAR__') {
        outputEl.innerHTML = '';
      } else if (command === 'matrix') {
        matrixEnabled = !matrixEnabled;
        if (matrixEnabled) { matrix.start(); appendOutput('Matrix rain enabled', 'success'); }
        else { matrix.stop(); appendOutput('Matrix rain disabled', 'output'); }
      } else if (command === 'history') {
        var hist = commandHistory.map(function(c, i) { return '  ' + (i+1) + '  ' + c; }).join('\n');
        appendOutput(hist, 'output');
      } else {
        appendOutput(result, 'output');
      }
    } else {
      appendOutput('bash: ' + command + ': command not found', 'error');
    }
    scrollToBottom();
  }

  function navigateHistory(dir) {
    var idx = historyIndex + dir;
    if (idx >= 0 && idx <= commandHistory.length) {
      historyIndex = idx;
      inputEl.value = commandHistory[historyIndex] || '';
    }
  }

  function autoComplete() {
    var partial = inputEl.value.toLowerCase();
    var cmds = Object.keys(commands);
    var matches = cmds.filter(function(c) { return c.startsWith(partial); });
    if (matches.length === 1) inputEl.value = matches[0];
  }

  function triggerEasterEgg() {
    appendOutput('', 'output');
    appendOutput('KONAMI CODE ACTIVATED!', 'highlight');
    appendOutput('', 'output');
    var art = '<pre class="ascii-art">' +
      ' \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2557 \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2557\n' +
      ' \u2588\u2588\u2554\u2550\u2550\u2550\u255d \u2588\u2588\u2551 \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u255a\u2550\u2550\u2588\u2588\u2554\u255d\u2588\u2588\u2554\u2550\u2550\u255d\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\n' +
      ' \u2588\u2588\u2551      \u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2557 \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\n' +
      ' \u2588\u2588\u2551      \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2588\u2588\u2557\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2588\u2588\u2554\u255d\u2588\u2588\u2551\n' +
      ' \u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2551 \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2551   \u255a\u2588\u2588\u2588\u2588\u2588\u2557\u255a\u2550\u255d \u2588\u2588\u2551 \u255a\u2550\u255d \u2588\u2588\u2551\n' +
      '  \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u2550\u2550\u255d   \u255a\u2550\u255d    \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d     \u255a\u2550\u255d</pre>';
    appendOutput(art, 'output');
    appendOutput('', 'output');
    appendOutput('You found the easter egg!', 'success');
    appendOutput('This portfolio is built with pure vanilla JS', 'output');
    appendOutput('No frameworks, no libraries, just raw code.', 'output');
  }

  function updateStatusTime() {
    var timeEl = document.getElementById('status-time');
    var memEl = document.getElementById('status-mem');
    var fpsEl = document.getElementById('status-fps');

    function updateTime() {
      timeEl.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
    }
    updateTime();
    setInterval(updateTime, 1000);

    var frameCount = 0, lastTime = performance.now();
    function updateFPS() {
      frameCount++;
      var now = performance.now();
      if (now - lastTime >= 1000) {
        fpsEl.textContent = frameCount;
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    }
    requestAnimationFrame(updateFPS);
  }

  /* ---- Event Listeners ---- */
  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var command = inputEl.value.trim();
      if (command) {
        executeCommand(command);
        commandHistory.push(command);
        historyIndex = commandHistory.length;
      }
      inputEl.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(1);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autoComplete();
    }
  });

  document.addEventListener('click', function() { inputEl.focus(); });

  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) konamiCode.shift();
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
      triggerEasterEgg();
      konamiCode = [];
    }
  });

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', async function() {
    var skipBoot = localStorage.getItem('portfolio-visited');
    await boot.run(skipBoot);
    matrix.init();
    crt.init();

    if (window.visualViewport) {
      visualViewport.addEventListener('resize', onMobileResize);
      visualViewport.addEventListener('scroll', onMobileResize);
    }
    window.addEventListener('resize', onMobileResize);

    inputLine.style.display = 'flex';
    inputEl.focus();
    updateStatusTime();
    localStorage.setItem('portfolio-visited', 'true');
    await sleep(500);
    inputEl.value = 'about';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  });
})();