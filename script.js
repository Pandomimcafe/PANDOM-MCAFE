
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const resultText = document.getElementById('resultText');
const spinBtn = document.getElementById('spinBtn');

const segments = [
  "3 Top Dondurma", "%20 İndirim", "Soğuk Kahve", "Milkshake", "%10 İndirim",
  "Şansını Dene", "2 Bira + Cips (250₺)", "Bir Daha!", "Boş", "Tatlı + Türk Kahvesi"
];
const colors = ["#f87171","#fbbf24","#34d399","#60a5fa","#a78bfa","#f472b6","#fb923c","#4ade80","#facc15","#38bdf8"];
let angle = 0;
let spinCount = parseInt(localStorage.getItem('spinCount') || '0');
const maxSpins = 2;
const week = 7 * 24 * 60 * 60 * 1000;

function drawWheel() {
  const arc = 2 * Math.PI / segments.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < segments.length; i++) {
    const start = angle + i * arc;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, start, start + arc);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(start + arc / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    ctx.fillText(segments[i], 180, 0);
    ctx.restore();
  }
}
drawWheel();

spinBtn.addEventListener("click", () => {
  if (spinCount >= maxSpins) {
    resultText.textContent = "Bu haftalık hakkınızı kullandınız.";
    return;
  }

  const extra = Math.floor(Math.random() * 360);
  const total = 360 * 5 + extra;
  angle += total * Math.PI / 180;

  canvas.style.transition = "transform 5s ease-out";
  canvas.style.transform = `rotate(${total}deg)`;

  setTimeout(() => {
    const degrees = (total + 90) % 360;
    const segmentAngle = 360 / segments.length;
    const index = Math.floor(segments.length - (degrees / segmentAngle)) % segments.length;
    resultText.textContent = "Kazandın: " + segments[index];
    spinCount++;
    localStorage.setItem("spinCount", spinCount.toString());
    localStorage.setItem("lastSpin", Date.now().toString());
  }, 5200);
});

const motiveEl = document.getElementById("motive");
const motiveBtn = document.getElementById("motiveBtn");
const motives = [
  "Gülümse, çünkü hayat sana gülümsüyor.",
  "İnan, başar, tekrar et.",
  "Bugün senin günün!",
  "Kendine inandığın an başlarsın.",
  "Yol ne kadar uzun olursa olsun ilk adımla başlar.",
  "İyi düşün, iyi olsun.",
  "Her yeni gün bir fırsattır.",
  "Hayallerin için çalış!",
  "Enerjin çevreni aydınlatır.",
  "Pes etme, zafer yakındır."
];
let motiveCount = parseInt(localStorage.getItem("motiveCount") || "0");

motiveBtn.addEventListener("click", () => {
  if (motiveCount >= 2) {
    motiveEl.textContent = "Başka cümle yok... Cafede dertleşiriz ☕";
    return;
  }
  const rnd = Math.floor(Math.random() * motives.length);
  motiveEl.textContent = '"' + motives[rnd] + '"';
  motiveCount++;
  localStorage.setItem("motiveCount", motiveCount.toString());
});

// haftalık sıfırlama
const lastSpin = parseInt(localStorage.getItem('lastSpin') || '0');
if (Date.now() - lastSpin > week) {
  localStorage.setItem("spinCount", "0");
  localStorage.setItem("motiveCount", "0");
}
