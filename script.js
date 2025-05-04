
const motives = [
  "Bugün harika bir şey olacak!",
  "Sen güçlüsün.",
  "Kendine güven.",
  "Her şey mümkün.",
  "Gülümse, çünkü enerjin bulaşıcı.",
  "İçindeki ışık dışını da aydınlatır.",
  "Sen bir mucizesin.",
  "İnanmak başarmanın yarısıdır.",
  "Yavaş da olsa ilerle.",
  "Bugünü en iyi şekilde yaşa.",
  "Vazgeçme, yaklaştın.",
  "Gözlerin yıldız gibi parlıyor.",
  "Yarın yeni bir başlangıç.",
  "Sevgiyle dolusun.",
  "Motivasyon içten gelir.",
  "Hayal et, harekete geç.",
  "Sen fark yaratansın.",
  "Her gün bir adım.",
  "Bir tebessüm dünyayı değiştirir.",
  "Senin zamanın şimdi!"
];

let motiveCount = 0;

function newMotive() {
  const text = document.querySelector("h2");
  if (motiveCount < 2) {
    const index = Math.floor(Math.random() * motives.length);
    text.innerText = motives[index];
  } else {
    text.innerText = "Başka cümle yok... Cafede dertleşiriz ☕";
  }
  motiveCount++;
}

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = [
  "Sıcak Kahve", "Milkshake", "2 Bira + Cips (250₺)", "Boş :(", "%10 İndirim",
  "Sürpriz", "Şansını Dene", "3 Top Dondurma", "Boş :(", "%20 İndirim"
];
const colors = [
  "#f44336", "#9c27b0", "#3f51b5", "#03a9f4", "#4caf50",
  "#ffeb3b", "#ff9800", "#795548", "#607d8b", "#e91e63"
];

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 140;
  const sliceAngle = 2 * Math.PI / segments.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments.length; i++) {
    const startAngle = i * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Arial";
    ctx.fillText(segments[i], radius - 10, 5);
    ctx.restore();
  }
}

let spinning = false;
let spinCount = 0;

function spin() {
  if (spinning || spinCount >= 2) return;
  spinning = true;
  spinCount++;

  let extra = spinCount === 2 ? 180 : 0;
  const totalRotation = 360 * 5 + Math.floor(Math.random() * 360) + extra;
  let current = 0;
  const interval = setInterval(() => {
    drawWheel();
    canvas.style.transform = "rotate(" + current + "deg)";
    current += 10;
    if (current >= totalRotation) {
      clearInterval(interval);
      const finalAngle = (totalRotation % 360);
      const index = segments.length - Math.floor((finalAngle / 360) * segments.length) - 1;
      setTimeout(() => {
        alert("Kazandın: " + segments[index]);
        spinning = false;
      }, 300);
    }
  }, 20);
}

drawWheel();
