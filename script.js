
const motives = [
  "Bugün harika bir gün olabilir, yeter ki sen iste.",
  "Hayallerin için adım at!",
  "Küçük adımlar büyük farklar yaratır.",
  "Senin için her şey mümkün.",
  "Kendine güven!",
  "Gülümse, çünkü hayat güzel.",
  "İyi şeyler zaman alır.",
  "Bugün senin günün.",
  "Her sabah yeni bir başlangıç.",
  "Zorluklar seni güçlü yapar."
];

function newMotive() {
  const random = Math.floor(Math.random() * motives.length);
  document.getElementById("motiveText").innerText = motives[random];
}

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const rewards = [
  "Milkshake", "2 Bira + Cips", "%10 İndirim",
  "Şansını Dene", "Sıcak Kahve", "Boş 😅",
  "3 Top Dondurma", "Çekiliş Hakkı", "Bir Tatlı", "Bir Soğuk İçecek"
];

let angles = [];
let startAngle = 0;
const arc = Math.PI / (rewards.length / 2);
for (let i = 0; i < rewards.length; i++) angles.push(i * arc);

function drawWheel() {
  for (let i = 0; i < rewards.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${(i * 360) / rewards.length}, 70%, 60%)`;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, angles[i], angles[i] + arc);
    ctx.lineTo(250, 250);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(250, 250);
    ctx.rotate(angles[i] + arc / 2);
    ctx.textAlign = "right";
    ctx.fillText(rewards[i], 190, 10);
    ctx.restore();
  }
}
drawWheel();

let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;
  let rotation = Math.random() * 360 + 720;
  let duration = 7000;
  let start = null;
  const tick = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const ease = 1 - Math.pow(1 - progress / duration, 3);
    const angle = rotation * ease;
    canvas.style.transform = `rotate(${angle}deg)`;
    if (progress < duration) {
      requestAnimationFrame(tick);
    } else {
      const finalAngle = (angle % 360);
      const index = Math.floor((360 - finalAngle + 90) % 360 / (360 / rewards.length));
      setTimeout(() => {
        alert("Kazandın: " + rewards[index]);
        spinning = false;
      }, 100);
    }
  };
  requestAnimationFrame(tick);
}
