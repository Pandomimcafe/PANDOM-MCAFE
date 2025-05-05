
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const spinBtn = document.getElementById("spin");
  const messageEl = document.getElementById("resultMessage");
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
    "Bir Dahaki Gelişe 🎁", "%20 İndirim", "Şansını Dene", "%10 İndirim", 
    "Milkshake", "Sıcak Kahve", "2 Bira + Cips (250₺)", 
    "3 Top Dondurma", "Boş 😅", "Bir Dahaki Gelişe 🎁"
  ];

  let angle = 0;
  let spinning = false;
  let motiveCount = 0;

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
      ctx.fillStyle = `hsl(${i * 360 / num}, 80%, 60%)`;
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, i * arc, (i + 1) * arc);
      ctx.lineTo(250, 250);
      ctx.fill();
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate((i + 0.5) * arc);
      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.textAlign = "right";
      ctx.fillText(rewards[i], 230, 10);
      ctx.restore();
    }
  }

  function spinWheel() {
    if (spinning || spinData.count >= 2) {
      alert("Bu haftalık çevirme hakkınız doldu.");
      return;
    }
    spinning = true;
    const randAngle = 360 * 7 + Math.floor(Math.random() * 360);
    let current = 0;
    const interval = setInterval(() => {
      angle += 10;
      angle %= 360;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(angle * Math.PI / 180);
      ctx.translate(-250, -250);
      drawWheel();
      ctx.restore();
      current += 10;
      if (current >= randAngle) {
        clearInterval(interval);
        spinning = false;
        spinData.count += 1;
        spinData.last = Date.now();
        localStorage.setItem("spinData", JSON.stringify(spinData));
        const index = rewards.length - Math.floor(((angle % 360) / (360 / rewards.length))) - 1;
        const result = rewards[index < 0 ? 0 : index];
        messageEl.innerText = "Tebrikler! Kazandığınız: " + result;
      }
    }, 20);
  }

  function newMotive() {
    motiveCount++;
    if (motiveCount >= 3) {
      messageEl.innerText = "Bu haftalık 2 güzel söz hakkınızı kullandınız. Cafede dertleşiriz ☕";
    } else {
      const random = motives[Math.floor(Math.random() * motives.length)];
      messageEl.innerText = '"' + random + '"';
    }
  }

  drawWheel();
  spinBtn.addEventListener("click", spinWheel);
  motiveBtn.addEventListener("click", newMotive);
});
