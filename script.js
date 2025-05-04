const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const options = [
  "Soğuk Kahve", "Milkshake", "%10 İndirim", "Şansını Dene", 
  "2 Bira + Cips (250₺)", "Bir Dahaki Gelişe", "Boş 😅", 
  "3 Top Dondurma", "%20 İndirim"
];

const colors = [
  "#3498db", "#f39c12", "#e67e22", "#8e44ad",
  "#e74c3c", "#d63031", "#2d3436", "#27ae60", "#9b59b6"
];

let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;

let spinsLeft = 2;

function drawRouletteWheel() {
  const outsideRadius = 200;
  const textRadius = 160;
  const insideRadius = 100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  ctx.font = "16px Arial";

  for (let i = 0; i < options.length; i++) {
    let angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];

    ctx.beginPath();
    ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
    ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                  250 + Math.sin(angle + arc / 2) * textRadius);
    ctx.rotate(angle + arc / 2);
    ctx.fillText(options[i], -ctx.measureText(options[i]).width / 2, 0);
    ctx.restore();
  }
}

function rotateWheel() {
  startAngle += Math.PI / 64;
  drawRouletteWheel();
  spinTimeout = setTimeout(rotateWheel, 10);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arc * 180 / Math.PI;
  const index = Math.floor((360 - degrees % 360) / arcd);
  alert("Kazandığın: " + options[index]);
}

function spinWheel() {
  if (spinsLeft <= 0) {
    alert("Bu haftalık hakkını kullandın!");
    return;
  }

  rotateWheel();
  setTimeout(() => {
    stopRotateWheel();
    spinsLeft--;
  }, 3000);
}

let motiveIndex = 0;
const motives = [
  "Bugün harika bir şey olacak!",
  "Senin gülüşün her şeye değer.",
  "İyi düşün, iyi olsun.",
  "Güzel günler yakında!",
  "İnandığın her şey mümkün.",
  "Kendine inan!",
  "Kahveni iç, çarkı çevir, gülümse."
];

function showMotive() {
  if (motiveIndex < 2) {
    document.getElementById("motiveText").innerText = motives[Math.floor(Math.random() * motives.length)];
    motiveIndex++;
  } else {
    document.getElementById("motiveText").innerText = "Başka cümle yok.. Cafede dertleşiriz ☕";
  }
}

drawRouletteWheel();