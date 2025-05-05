
const wheel = document.getElementById("wheel");
const resultDiv = document.getElementById("result");

const prizes = [
  "Bir Daha!", "3 Top Dondurma", "%20 İndirim",
  "Şansını Dene", "%10 İndirim", "Milkshake",
  "Soğuk Kahve", "2 Bira + Cips (250₺)", "Bir Daha!", "Bir Daha!"
];

const motives = [
  "Bugün harika bir gün olabilir, yeter ki sen iste.",
  "Her gün yeni bir başlangıçtır.",
  "Senin yapamayacağın bir şey yok.",
  "Bugün senin günün!",
  "Hayallerin peşinden git!",
  "Başarı, azimle gelir.",
  "Kendine inan, yeter!"
];

function newMotive() {
  const random = Math.floor(Math.random() * motives.length);
  document.getElementById("motiveText").textContent = motives[random];
}

function canSpinAgain() {
  const key = "spinCount";
  const data = localStorage.getItem(key);
  const now = new Date();
  const week = 1000 * 60 * 60 * 24 * 7;

  if (!data) return true;

  const parsed = JSON.parse(data);
  const timeDiff = now.getTime() - new Date(parsed.time).getTime();
  return parsed.count < 2 || timeDiff > week;
}

function updateSpinCount() {
  const key = "spinCount";
  const now = new Date();
  const data = localStorage.getItem(key);

  let count = 1;
  if (data) {
    const parsed = JSON.parse(data);
    const timeDiff = now.getTime() - new Date(parsed.time).getTime();
    if (timeDiff < 1000 * 60 * 60 * 24 * 7) {
      count = parsed.count + 1;
    }
  }

  localStorage.setItem(key, JSON.stringify({ count, time: now }));
}

document.getElementById("spinBtn").addEventListener("click", () => {
  if (!canSpinAgain()) {
    alert("Bu haftalık çevirme hakkınız doldu.");
    return;
  }

  const baseDeg = 360 * 5;
  const randomDeg = Math.floor(Math.random() * 360);
  const totalDeg = baseDeg + randomDeg;

  wheel.style.transition = "transform 7s ease-out";
  wheel.style.transform = `rotate(${totalDeg}deg)`;

  updateSpinCount();

  setTimeout(() => {
    const prizeIndex = Math.floor(((360 - (randomDeg % 360)) % 360) / (360 / prizes.length));
    resultDiv.innerHTML = `Tebrikler! Kazandığınız: <strong>${prizes[prizeIndex]}</strong>`;
  }, 7000);
});
