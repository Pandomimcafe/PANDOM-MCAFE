
const motives = [
  "Bugün harika bir gün olabilir, yeter ki sen iste.",
  "Şans hazır olanı sever.",
  "Küçük bir adım, büyük değişimlerin başlangıcıdır.",
  "Pes etme, belki de zafer bir sonraki denemededir.",
  "Gülümse, çünkü enerjin çevreni etkiler.",
  "Unutma: En karanlık an, şafağa en yakın olandır."
];

let motiveCount = 0;
function newMotive() {
  motiveCount++;
  const el = document.getElementById("motive");
  if (motiveCount > 2) {
    el.textContent = "Artık başka cümle yok... Cafede dertleşiriz ☕";
    return;
  }
  el.textContent = motives[Math.floor(Math.random() * motives.length)];
}

const prizes = [
  "Tatlı + Türk Kahvesi", "2 Soğuk İçecek", "Nargile Bedava", "2 Bira + 1 Cips",
  "%20 İndirim", "Milkshake / Soğuk Kahve", "Şansını Bir Daha Dene",
  "3 Top Dondurma", "Boş Dilim 😄", "%10 İndirim"
];
const colors = ["#f44336", "#3f51b5", "#4caf50", "#ff9800", "#9c27b0", "#00bcd4", "#e91e63", "#8bc34a", "#ffeb3b", "#607d8b"];

const wheel = document.getElementById("wheel");
prizes.forEach((text, i) => {
  const sector = document.createElement("div");
  sector.className = "sector";
  sector.style.transform = `rotate(${i * 36}deg) skewY(-54deg)`;
  sector.style.background = colors[i % colors.length];
  const span = document.createElement("span");
  span.textContent = text;
  sector.appendChild(span);
  wheel.appendChild(sector);
});

let deg = 0;
let spinCount = 0;

function spin() {
  if (spinCount >= 2) {
    alert("Çevirme hakkınız doldu.");
    return;
  }
  spinCount++;

  let baseDeg = 360 * 3;
  if (spinCount === 2) baseDeg = 360 * 2;

  deg += baseDeg + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {
    const norm = deg % 360;
    const corrected = 360 - norm;
    const index = Math.floor(corrected / 36) % 10;
    alert("Kazandın: " + prizes[index]);
  }, 7000);
}
