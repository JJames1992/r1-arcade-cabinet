/**
 * R1 Arcade Cabinet - Games Implementation
 * Pure Black (#000000) and White (#FFFFFF)
 */

const Games = {
  stack_tower: {
    state: { blocks: [], currentWidth: 60, currentX: 0, direction: 1, speed: 2, y: 250, gameOver: false, score: 0 },
    init(canvas) {
      this.state.blocks = [{ x: 90, y: 260, w: 60 }];
      this.state.y = 240;
      this.state.currentWidth = 60;
      this.state.score = 0;
      this.state.gameOver = false;
    },
    update(wheelDelta) {
      if (this.state.gameOver) return;
      this.state.currentX += this.state.direction * this.state.speed;
      if (this.state.currentX <= 0 || this.state.currentX + this.state.currentWidth >= 240) this.state.direction *= -1;
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282);
      ctx.fillStyle = '#fff';
      this.state.blocks.forEach(b => ctx.fillRect(b.x, b.y, b.w, 15));
      ctx.fillRect(this.state.currentX, this.state.y, this.state.currentWidth, 15);
      ctx.font = '10px Courier New'; ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() {
      if (this.state.gameOver) { this.init(); return; }
      const lastBlock = this.state.blocks[this.state.blocks.length - 1];
      const leftBound = Math.max(this.state.currentX, lastBlock.x);
      const rightBound = Math.min(this.state.currentX + this.state.currentWidth, lastBlock.x + lastBlock.w);
      const newWidth = rightBound - leftBound;
      if (newWidth <= 0) { this.state.gameOver = true; } else {
        this.state.blocks.push({ x: leftBound, y: this.state.y, w: newWidth });
        this.state.currentWidth = newWidth; this.state.y -= 20; this.state.score++; this.state.speed += 0.2;
        if (this.state.blocks.length > 10) { this.state.blocks.shift(); this.state.blocks.forEach(b => b.y += 20); this.state.y += 20; }
      }
    }
  },

  pong: {
    state: { p1: 120, ball: { x: 120, y: 140, dx: 2, dy: 2 }, score: 0, gameOver: false },
    init() { this.state.p1 = 120; this.state.ball = { x: 120, y: 140, dx: 2, dy: 2 }; this.state.score = 0; this.state.gameOver = false; },
    update(wheelDelta) {
      if (this.state.gameOver) return;
      this.state.p1 = Math.max(25, Math.min(215, this.state.p1 + wheelDelta * 10));
      this.state.ball.x += this.state.ball.dx; this.state.ball.y += this.state.ball.dy;
      if (this.state.ball.x <= 5 || this.state.ball.x >= 235) this.state.ball.dx *= -1;
      if (this.state.ball.y <= 30) this.state.ball.dy *= -1;
      if (this.state.ball.y >= 260) {
        if (this.state.ball.x > this.state.p1 - 25 && this.state.ball.x < this.state.p1 + 25) { this.state.ball.dy *= -1; this.state.score++; } else { this.state.gameOver = true; }
      }
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff';
      ctx.fillRect(this.state.p1 - 25, 265, 50, 5); ctx.fillRect(this.state.ball.x - 3, this.state.ball.y - 3, 6, 6);
      ctx.font = '10px Courier New'; ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() { if (this.state.gameOver) this.init(); }
  },

  shooter: {
    state: { p: 141, bullets: [], enemies: [], score: 0, gameOver: false, tick: 0 },
    init() { this.state.p = 141; this.state.bullets = []; this.state.enemies = []; this.state.score = 0; this.state.gameOver = false; },
    update(wheelDelta) {
      if (this.state.gameOver) return;
      this.state.p = Math.max(10, Math.min(272, this.state.p + wheelDelta * 10));
      this.state.bullets.forEach((b, i) => { b.x += 4; if (b.x > 240) this.state.bullets.splice(i, 1); });
      if (this.state.tick++ % 60 === 0) this.state.enemies.push({ x: 240, y: Math.random() * 260 + 10 });
      this.state.enemies.forEach((e, i) => {
        e.x -= 2; if (e.x < 0) this.state.gameOver = true;
        this.state.bullets.forEach((b, bi) => {
          if (Math.abs(b.x - e.x) < 10 && Math.abs(b.y - e.y) < 10) {
            this.state.enemies.splice(i, 1); this.state.bullets.splice(bi, 1); this.state.score++;
          }
        });
      });
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff';
      ctx.fillRect(10, this.state.p - 5, 15, 10);
      this.state.bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 2));
      this.state.enemies.forEach(e => ctx.fillRect(e.x, e.y, 10, 10));
      ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() { if (this.state.gameOver) this.init(); else this.state.bullets.push({ x: 25, y: this.state.p }); }
  }
};
  maze: {
    state: { x: 120, y: 141, score: 0, gameOver: false, goal: { x: 200, y: 200 } },
    init() { this.state.x = 120; this.state.y = 141; this.state.score = 0; this.state.gameOver = false; this.state.goal = { x: Math.random() * 200 + 20, y: Math.random() * 200 + 20 }; },
    update(wd, tilt) {
      if (this.state.gameOver) return;
      if (tilt) { this.state.x += tilt.x * 5; this.state.y += tilt.y * 5; }
      this.state.x = Math.max(5, Math.min(235, this.state.x));
      this.state.y = Math.max(35, Math.min(277, this.state.y));
      if (Math.abs(this.state.x - this.state.goal.x) < 15 && Math.abs(this.state.y - this.state.goal.y) < 15) { this.state.score++; this.init(); }
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(this.state.x, this.state.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeRect(this.state.goal.x - 10, this.state.goal.y - 10, 20, 20);
      ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() { if (this.state.gameOver) this.init(); }
  },

  rps: {
    state: { p: 0, c: -1, res: '', score: 0 },
    init() { this.state.p = 0; this.state.c = -1; this.state.res = 'CHOOSE'; },
    update(wd) { this.state.p = (this.state.p + (wd > 0 ? 1 : (wd < 0 ? -1 : 0)) + 3) % 3; },
    draw(ctx) {
      const h = ['ROCK', 'PAPER', 'SCISSORS'];
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff';
      ctx.textAlign = 'center'; ctx.fillText(h[this.state.p], 120, 100);
      ctx.fillText(this.state.res, 120, 140);
      if (this.state.c !== -1) ctx.fillText(`CPU: ${h[this.state.c]}`, 120, 180);
      ctx.fillText(`SCORE: ${this.state.score}`, 120, 20);
    },
    onAction() {
      this.state.c = Math.floor(Math.random() * 3);
      if (this.state.p === this.state.c) this.state.res = 'DRAW';
      else if ((this.state.p + 1) % 3 === this.state.c) { this.state.res = 'LOSE'; this.state.score = 0; }
      else { this.state.res = 'WIN'; this.state.score++; }
    }
  },

  cannon: {
    state: { a: 45, p: 0, target: 200, score: 0, firing: false, bx: 0, by: 0, bvx: 0, bvy: 0 },
    init() { this.state.a = 45; this.state.p = 0; this.state.target = Math.random() * 150 + 50; this.state.firing = false; },
    update(wd) {
      if (this.state.firing) {
        this.state.bx += this.state.bvx; this.state.by += this.state.bvy; this.state.bvy += 0.2;
        if (this.state.by > 270) {
          if (Math.abs(this.state.bx - this.state.target) < 20) { this.state.score++; this.init(); }
          else this.state.firing = false;
        }
      } else { this.state.a = Math.max(0, Math.min(90, this.state.a + wd * 5)); }
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff';
      ctx.fillRect(this.state.target - 10, 270, 20, 12);
      if (this.state.firing) ctx.fillRect(this.state.bx - 2, this.state.by - 2, 4, 4);
      ctx.save(); ctx.translate(10, 270); ctx.rotate(-this.state.a * Math.PI / 180); ctx.fillRect(0, -5, 20, 10); ctx.restore();
      ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() {
      if (!this.state.firing) {
        this.state.firing = true; this.state.bx = 10; this.state.by = 270;
        this.state.bvx = Math.cos(this.state.a * Math.PI / 180) * 10; this.state.bvy = -Math.sin(this.state.a * Math.PI / 180) * 10;
      }
    }
  }
};
  dice: {
    state: { v: 1, rolling: 0 },
    init() { this.state.v = 1; this.state.rolling = 0; },
    update() { if (this.state.rolling > 0) { this.state.v = Math.floor(Math.random() * 6) + 1; this.state.rolling--; } },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
      ctx.strokeRect(90, 110, 60, 60); ctx.font = '30px Courier New'; ctx.fillText(this.state.v, 120, 150);
    },
    onAction() { this.state.rolling = 20; }
  },

  log_roller: {
    state: { p: 120, obs: [], score: 0, gameOver: false, tick: 0 },
    init() { this.state.p = 120; this.state.obs = []; this.state.score = 0; this.state.gameOver = false; },
    update(wd) {
      if (this.state.gameOver) return;
      this.state.p = Math.max(20, Math.min(220, this.state.p + wd * 10));
      if (this.state.tick++ % 80 === 0) this.state.obs.push({ x: Math.random() * 200 + 20, y: 0 });
      this.state.obs.forEach((o, i) => {
        o.y += 3; if (o.y > 282) { this.state.obs.splice(i, 1); this.state.score++; }
        if (Math.abs(o.x - this.state.p) < 20 && Math.abs(o.y - 250) < 20) this.state.gameOver = true;
      });
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.fillStyle = '#fff';
      ctx.fillRect(this.state.p - 15, 250, 30, 10);
      this.state.obs.forEach(o => ctx.fillRect(o.x - 10, o.y - 10, 20, 20));
      ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() { if (this.state.gameOver) this.init(); }
  },

  tempest: {
    state: { a: 0, shots: [], enemies: [], score: 0, gameOver: false, tick: 0 },
    init() { this.state.a = 0; this.state.shots = []; this.state.enemies = []; this.state.score = 0; this.state.gameOver = false; },
    update(wd) {
      if (this.state.gameOver) return;
      this.state.a = (this.state.a + wd * 0.2) % (Math.PI * 2);
      this.state.shots.forEach((s, i) => { s.r -= 5; if (s.r < 0) this.state.shots.splice(i, 1); });
      if (this.state.tick++ % 50 === 0) this.state.enemies.push({ a: Math.random() * Math.PI * 2, r: 0 });
      this.state.enemies.forEach((e, i) => {
        e.r += 2; if (e.r > 120) this.state.gameOver = true;
        this.state.shots.forEach((s, si) => {
          if (Math.abs(e.a - s.a) < 0.2 && Math.abs(e.r - s.r) < 10) { this.state.enemies.splice(i, 1); this.state.shots.splice(si, 1); this.state.score++; }
        });
      });
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.strokeStyle = '#fff'; ctx.fillStyle = '#fff';
      ctx.beginPath(); for (let i = 0; i < 8; i++) { let ra = i * Math.PI / 4; ctx.lineTo(120 + Math.cos(ra) * 100, 141 + Math.sin(ra) * 100); } ctx.closePath(); ctx.stroke();
      ctx.fillRect(120 + Math.cos(this.state.a) * 90 - 5, 141 + Math.sin(this.state.a) * 90 - 5, 10, 10);
      this.state.shots.forEach(s => ctx.fillRect(120 + Math.cos(s.a) * s.r, 141 + Math.sin(s.a) * s.r, 4, 4));
      this.state.enemies.forEach(e => ctx.fillRect(120 + Math.cos(e.a) * e.r, 141 + Math.sin(e.a) * e.r, 8, 8));
      ctx.fillText(`SCORE: ${this.state.score}`, 10, 20);
    },
    onAction() { if (this.state.gameOver) this.init(); else this.state.shots.push({ a: this.state.a, r: 100 }); }
  },

  pinball: {
    state: { p: 120, ball: { x: 120, y: 141, dx: 2, dy: 2 }, score: 0, gameOver: false },
    init() { this.state.p = 120; this.state.ball = { x: 120, y: 141, dx: 2, dy: 2 }; this.state.score = 0; this.state.gameOver = false; },
    update(wd) {
      if (this.state.gameOver) return;
      this.state.ball.x += this.state.ball.dx; this.state.ball.y += this.state.ball.dy;
      if (this.state.ball.x <= 10 || this.state.ball.x >= 230) this.state.ball.dx *= -1;
      if (this.state.ball.y <= 10) this.state.ball.dy *= -1;
      if (this.state.ball.y > 282) this.state.gameOver = true;
    },
    draw(ctx) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, 282); ctx.strokeStyle = '#fff'; ctx.fillStyle = '#fff';
      ctx.strokeRect(10, 10, 220, 262); ctx.fillRect(this.state.ball.x - 3, this.state.ball.y - 3, 6, 6);
      ctx.fillRect(this.state.p - 20, 260, 40, 5); ctx.fillText(`SCORE: ${this.state.score}`, 20, 30);
    },
    onAction() {
      if (this.state.gameOver) this.init();
      else if (Math.abs(this.state.ball.y - 260) < 10 && Math.abs(this.state.ball.x - this.state.p) < 30) { this.state.ball.dy *= -1.1; this.state.score += 10; }
    }
  }
};
