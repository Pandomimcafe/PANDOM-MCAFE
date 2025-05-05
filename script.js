
document.addEventListener("DOMContentLoaded", () => {
  const prizes = [
    "Tatlı + Türk Kahvesi",
    "2 Adet Soğuk İçecek",
    "Nargile Bedava",
    "2 Bira + 1 Cips (250 TL)",
    "%20 İndirim",
    "Milkshake / Soğuk Kahve",
    "Şansını Bir Daha Dene",
    "3 Top Dondurma",
    "Boş 🫥",
    "%10 İndirim"
  ];

  const weekMS = 7 * 24 * 60 * 60 * 1000;

  function canSpinThisWeek() {
    const maxSpins = 2;
    const now = Date.now();
    let lastSpin = localStorage.getItem("lastSpinTime");
    let count = parseInt(localStorage.getItem("spinCount") || "0");

    if (!lastSpin || now - parseInt(lastSpin) > weekMS) {
      localStorage.setItem("lastSpinTime", now.toString());
      localStorage.setItem("spinCount", "0");
      count = 0;
    }

    return count < maxSpins;
  }

  function recordSpinUse() {
    let count = parseInt(localStorage.getItem("spinCount") || "0");
    localStorage.setItem("spinCount", (count + 1).toString());
  }

  document.getElementById("spinBtn").addEventListener("click", () => {
    if (!canSpinThisWeek()) {
      alert("Çevirme hakkınız doldu. Lütfen 1 hafta sonra tekrar deneyin. ☕");
      return;
    }

    recordSpinUse();

    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    let angle = 0;
    const spinAngle = Math.random() * 360 + 720;
    const duration = 3000;
    let start = null;

    function drawWheel(angle) {
      const radius = canvas.width / 2;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const numSegments = prizes.length;
      const arcSize = (2 * Math.PI) / numSegments;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * arcSize + angle;
        const endAngle = startAngle + arcSize;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = ["#4caf50", "#f44336", "#ff9800", "#ff5722",
                        "#9c27b0", "#3f51b5", "#607d8b", "#2196f3",
                        "#00bcd4", "#8bc34a"][i];
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        ctx.fillText(prizes[i], radius - 10, 5);
        ctx.restore();
      }
    }

    function animate(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let ease = 1 - Math.pow(1 - progress / duration, 3);
      angle = (spinAngle * ease * Math.PI) / 180;
      drawWheel(angle);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        const degrees = (spinAngle % 360);
        const selectedIndex = Math.floor(((360 - degrees + 18) % 360) / 36);
        const reward = prizes[selectedIndex];
        document.getElementById("resultText").textContent = `Kazandığınız: ${reward}`;

        const winMsg = document.getElementById("winMessage");
        if (reward.includes("Boş") || reward.includes("Bir Daha")) {
          winMsg.innerText = "Bu sefer olmadı... 😅";
        } else {
          winMsg.innerText = "🎉 Tebrikler! " + reward + " 🎉";
        }
        winMsg.style.animation = "none";
        void winMsg.offsetWidth;
        winMsg.style.animation = "fadeInOut 3s ease-in-out forwards";
      }
    }

    requestAnimationFrame(animate);
  });
});
