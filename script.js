
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const segments = [
  '2 Bira + Cips (250₺)', 'Şansını Dene', '%10 İndirim', 'Boş :(', 
  'Nargile', 'Milkshake', 'Soğuk Kahve', '%20 İndirim',
  '3 Top Dondurma', 'Bir Dahaki Gelişe'
];
const colors = ['#f44336','#3f51b5','#4caf50','#ffeb3b','#ff9800','#9c27b0','#03a9f4','#795548','#009688','#e91e63'];

let currentAngle = 0;
let isSpinning = false;
let spinCount = parseInt(localStorage.getItem('spinCount') || '0');
const maxSpins = 2;
const week = 7 * 24 * 60 * 60 * 1000;

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  const arcSize = (2 * Math.PI) / segments.length;

  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, i * arcSize, (i + 1) * arcSize);
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(i * arcSize + arcSize / 2);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(segments[i], radius - 10, 0);
    ctx.restore();
  }
}
drawWheel();

function spinWheel() {
  if (isSpinning) return;
  if (spinCount >= maxSpins) {
    alert("Bu haftalık hakkınızı kullandınız.");
    return;
  }

  isSpinning = true;
  const spinTime = 7000;
  const randomIndex = Math.floor(Math.random() * segments.length);
  const arcSize = 360 / segments.length;
  const angleToRotate = (360 * 5) + (360 - (randomIndex * arcSize) - arcSize / 2);

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const progress = Math.min(elapsed / spinTime, 1);
    const easedProgress = easeOut(progress);

    currentAngle = angleToRotate * easedProgress;
    canvas.style.transform = `rotate(${currentAngle}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const actualIndex = randomIndex;
      alert("Kazandın: " + segments[actualIndex]);
      isSpinning = false;
      spinCount++;
      localStorage.setItem('spinCount', spinCount.toString());
      localStorage.setItem('lastSpin', Date.now().toString());
    }
  }

  requestAnimationFrame(animate);
}

const motivationalTexts = [
  "Bugün harika bir gün olabilir, yeter ki sen iste.",
  "Gülümse, çünkü gülümsemek en güzel direniştir.",
  "İyi şeyler zaman alır, sabırlı ol.",
  "Kendine inandığın gün başarmaya başlarsın.",
  "Yorulmak, başarmanın habercisidir.",
  "Her gün bir umuttur.",
  "İmkansız, sadece biraz daha zaman alır.",
  "Bugün başla, yarın geç olabilir.",
  "Hedefine odaklan, yoldan sapma.",
  "Cesaret bulaşıcıdır. Yay!"
];

let motiveCount = parseInt(localStorage.getItem('motiveCount') || '0');
function newMotive() {
  if (motiveCount >= 2) {
    document.getElementById('motiveText').innerText = "Başka cümle yok... Cafede dertleşiriz ☕";
    return;
  }
  const randomIndex = Math.floor(Math.random() * motivationalTexts.length);
  document.getElementById('motiveText').innerText = motivationalTexts[randomIndex];
  motiveCount++;
  localStorage.setItem('motiveCount', motiveCount.toString());
}

// haftalık sıfırlama
const lastSpin = parseInt(localStorage.getItem('lastSpin') || '0');
if (Date.now() - lastSpin > week) {
  localStorage.setItem('spinCount', '0');
  localStorage.setItem('motiveCount', '0');
}
