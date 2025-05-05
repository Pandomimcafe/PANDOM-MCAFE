
const motives = [
  "Bugün harika bir gün olabilir.",
  "Başarı, azimle gelir.",
  "Küçük adımlar büyük değişim getirir.",
  "Gülümse, çünkü enerjin çevreni etkiler.",
  "Her şey sende başlar.",
  "Zorluklar, güçlenmen içindir."
];
let motiveCount = 0;
let usedMotives = [];

function showMotive() {
  const el = document.getElementById("motiveText");
  if (motiveCount >= 2) {
    el.textContent = "Bu haftalık 2 güzel söz hakkınızı kullandınız. Cafede dertleşiriz ☕";
    return;
  }
  let available = motives.filter(m => !usedMotives.includes(m));
  const selected = available[Math.floor(Math.random() * available.length)];
  usedMotives.push(selected);
  el.textContent = '"' + selected + '"';
  motiveCount++;
}

// ÇARK
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const rewards = [
  "Tatlı + Türk Kahvesi", "2 Adet Soğuk İçecek", "Nargile Bedava",
  "2 Bira + 1 Cips (250₺)", "%20 İndirim", "Milkshake / Soğuk Kahve",
  "Şansını Bir Daha Dene", "3 Top Dondurma", "Boş Dilim 😄", "%10 İndirim"
];
let deg = 0;
let spinning = false;

const spinData = JSON.parse(localStorage.getItem("spinData") || '{"count":0,"last":0}');
const now = Date.now();
const oneWeek = 7 * 24 * 60 * 60 * 1000;
if (now - spinData.last > oneWeek) {
  spinData.count = 0;
  spinData.last = now;
  localStorage.setItem("spinData", JSON.stringify(spinData));
}

function drawWheel() {
  const num = rewards.length;
  const arc = (2 * Math.PI) / num;
  for (let i = 0; i < num; i++) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${i * 36}, 80%, 60%)`;
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, i * arc, (i + 1) * arc);
    ctx.lineTo(200, 200);
    ctx.fill();
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate((i + 0.5) * arc);
    ctx.fillStyle = "#000";
    ctx.font = "13px Arial";
    ctx.textAlign = "right";
    ctx.fillText(rewards[i], 180, 5);
    ctx.restore();
  }
}

function spin() {
  if (spinning || spinData.count >= 2) {
    alert("Bu haftalık çevirme hakkınız doldu.");
    return;
  }
  spinning = true;
  const randAngle = 360 * 7 + Math.floor(Math.random() * 360);
  let current = 0;
  const interval = setInterval(() => {
    deg += 10;
    deg %= 360;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(deg * Math.PI / 180);
    ctx.translate(-200, -200);
    drawWheel();
    ctx.restore();
    current += 10;
    if (current >= randAngle) {
      clearInterval(interval);
      spinning = false;
      spinData.count += 1;
      spinData.last = Date.now();
      localStorage.setItem("spinData", JSON.stringify(spinData));
      const index = rewards.length - Math.floor(((deg % 360) / (360 / rewards.length))) - 1;
      const result = rewards[index < 0 ? 0 : index];
      alert("Tebrikler! Kazandığınız: " + result);
    }
  }, 20);
}

drawWheel();
