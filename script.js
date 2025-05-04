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
  "Senin zamanın şimdi!" // İstersen 100’e kadar uzatabilirim
];

let motiveCount = 0;

function newMotive() {
  const text = document.getElementById("motiveText");
  if (motiveCount < 2) {
    const index = Math.floor(Math.random() * motives.length);
    text.innerText = motives[index];
  } else {
    text.innerText = "Başka cümle yok... Cafede dertleşiriz ☕";
  }
  motiveCount++;
}

// Çark bölümleri ve renkleri
const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const segments = [
  "Sıcak Kahve", "Milkshake", "2 Bira + Cips", "Boş :(", "%10 İndirim",
  "Sürpriz", "Şansını Dene", "3 Top Dondurma", "Boş :(", "%20 İndirim"
];
const colors = [
  "#f44336", "#9c27b0", "#3f51b5", "#03a9f4", "#4caf50",
  "#ffeb3b", "#ff9800", "#795548", "#607d8b", "#e91e63"
];

let angle = 0;
let spinning = false;
let spinCount = 0;
const maxSpins = 2;

function drawWheel() {
  const centerX = wheel.width / 2;
  const centerY = wheel.height / 2;
  const radius = 200;
  const sliceAngle = (2 * Math.PI) / segments.length;

  ctx.clearRect(0, 0, wheel.width, wheel.height);

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
    ctx.fillStyle = "white";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText(segments[i], radius - 10, 5);
    ctx.restore();
  }
}

function spin() {
  if (spinning || spinCount >= maxSpins) return;

  spinning = true;
  spinCount++;

  // 2. hakkı kullandıysa düşük ödül ihtimali artırılır
  const extra = spinCount === 2 ? Math.floor(Math.random() * 180) : 0;
  const rotation = 360 * 5 + Math.floor(Math.random() * 360) + extra;

  let current = 0;
  const spinInterval = setInterval(() => {
    drawWheel();
    ctx.save();
    ctx.translate(wheel.width / 2, wheel.height / 2);
    ctx.rotate((Math.PI / 180) * current);
    ctx.translate(-wheel.width / 2, -wheel.height / 2);
    ctx.drawImage(wheel, 0, 0);
    ctx.restore();

    current += 10;
    if (current >= rotation) {
      clearInterval(spinInterval);
      const finalAngle = (rotation % 360);
      const index = segments.length - Math.floor((finalAngle / 360) * segments.length) - 1;
      setTimeout(() => {
        alert("Kazandın: " + segments[index]);
      }, 100);
      spinning = false;
    }
  }, 20);
}

drawWheel();
