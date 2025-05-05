
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const messageEl = document.getElementById("message");
const motiveBtn = document.getElementById("motiveBtn");

const motives = [
  "Bugün harika bir gün olabilir.",
  "Başarı, azimle gelir.",
  "Her gün yeni bir başlangıçtır.",
  "Sen istersen her şey olur.",
  "İnanmak, başarmanın yarısıdır.",
  "Küçük adımlar büyük değişim getirir.",
  "Pozitif düşün, pozitif yaşa.",
  "Harekete geç, mucizeler seni bekliyor.",
  "Zorluklar, güçlenmen içindir.",
  "Her şey sende başlar."
];

const rewards = [
  "Bir Dahaki Gelişe 🎁",
  "%20 İndirim",
  "Şansını Dene",
  "%10 İndirim",
  "Milkshake",
  "Sıcak Kahve",
  "2 Bira + Cips (250₺)",
  "3 Top Dondurma",
  "Boş 😅",
  "Bir Dahaki Gelişe 🎁"
];

let angle = 0;
let spinning = false;
let drawWheel;
let drawPointer;
let spinCount = localStorage.getItem("spinCount") || 0;

function drawPrizeWheel() {
  const numSlices = rewards.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  for (let i = 0; i < numSlices; i++) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${i * 360 / numSlices}, 70%, 60%)`;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.lineTo(250, 250);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 16px sans-serif";
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate((i + 0.5) * sliceAngle);
    ctx.textAlign = "right";
    ctx.fillText(rewards[i], 200, 10);
    ctx.restore();
  }
}

function showMotivation() {
  if (spinCount >= 2) {
    messageEl.innerText = "Çevirme hakkınız doldu!";
    return;
  }
  const random = motives[Math.floor(Math.random() * motives.length)];
  messageEl.innerText = `"${random}"`;
}

function spinWheel() {
  if (spinning || spinCount >= 2) return;

  spinning = true;
  const randomIndex = Math.floor(Math.random() * rewards.length);
  const targetAngle = (360 / rewards.length) * randomIndex;
  const finalAngle = 360 * 7 + targetAngle; // 7 tur
  let current = 0;

  const interval = setInterval(() => {
    angle += 10;
    angle %= 360;
    draw();
    current += 10;

    if (current >= finalAngle) {
      clearInterval(interval);
      spinning = false;
      spinCount++;
      localStorage.setItem("spinCount", spinCount);
      const resultIndex = rewards.length - Math.floor((angle % 360) / (360 / rewards.length)) - 1;
      const prize = rewards[resultIndex];
      messageEl.innerText = `Tebrikler! Kazandığınız: ${prize}`;
    }
  }, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(angle * Math.PI / 180);
  ctx.translate(-250, -250);
  drawPrizeWheel();
  ctx.restore();
}

spinBtn.addEventListener("click", spinWheel);
motiveBtn.addEventListener("click", showMotivation);

draw();
