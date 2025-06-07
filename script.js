// FingerprintJS ile kimlik oluşturma
let fingerprint = null;
let canSpin = true;

const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
  .then(FingerprintJS => FingerprintJS.load())
  .then(fp => fp.get())
  .then(result => {
    fingerprint = result.visitorId;

    // Sheet.best'ten kullanıcı bugünden daha önce spin yaptı mı kontrol et
    const today = new Date().toISOString().split('T')[0];
    fetch("https://api.sheetbest.com/sheets/057a0181-a151-48c6-98f9-cbff6fdc4bf3")
      .then(res => res.json())
      .then(data => {
        const alreadyUsed = data.some(row =>
          row.fingerprint === fingerprint &&
          row.timestamp.startsWith(today)
        );
        if (alreadyUsed) {
          document.querySelector("button").disabled = true;
          document.querySelector("button").innerText = "Bugünlük hakkını kullandın 🛑";
          canSpin = false;
        }
      });
  });

// Motive Edici Cümleler
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
  "Tatlını al kahwen bizden ", "2 Adet Soft İçecek", "Nargile Bedava",
  "2 Bira + 1 Cips (250₺)", "%20 İndirim", "Milkshake / Soğuk Kahve",
  "Şansını Bir Daha Dene", "3 Top Dondurma", "Boş Dilim 😄", "%10 İndirim"
];
let deg = 0;
let spinning = false;

// Yerel spin sayacı
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

function sendResultToSheet(index, prize) {
  const info = {
    fingerprint: fingerprint,
    timestamp: new Date().toISOString(),
    index: index,
    result: prize,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezoneOffset: new Date().getTimezoneOffset(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height
  };

  fetch("https://api.sheetbest.com/sheets/057a0181-a151-48c6-98f9-cbff6fdc4bf3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  }).then(res => {
    console.log("Sheet.best'e gönderildi:", res.status);
  });
}
