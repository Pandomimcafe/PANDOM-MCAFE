
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("resultText");
const motiveText = document.getElementById("motiveText");
const motiveBtn = document.getElementById("motiveBtn");

const segments = [
    "3 Top Dondurma",
    "%10 İndirim",
    "Milkshake",
    "Sıcak Kahve",
    "Şansını Dene",
    "%20 İndirim",
    "Boş 🫥",
    "Bir Dahaki Gelişe",
];

const colors = [
    "#4caf50", "#f44336", "#ff9800", "#ff5722",
    "#9c27b0", "#3f51b5", "#607d8b", "#2196f3"
];

let angle = 0;
let spinning = false;

function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numSegments = segments.length;
    const arcSize = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSegments; i++) {
        const startAngle = i * arcSize + angle;
        const endAngle = startAngle + arcSize;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        ctx.fillText(segments[i], radius - 10, 5);
        ctx.restore();
    }
}

drawWheel();

spinBtn.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    resultText.textContent = "";

    let spinAngle = Math.random() * 360 + 720;
    let duration = 3000;
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let ease = 1 - Math.pow(1 - progress / duration, 3);
        angle = (spinAngle * ease * Math.PI) / 180;
        drawWheel();

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            const degrees = (spinAngle % 360);
            const selectedIndex = Math.floor(((360 - degrees + 22.5) % 360) / 45);
            const reward = segments[selectedIndex];
            resultText.textContent = `Kazandığınız: ${reward}`;
    showWinMessage(reward);
            spinning = false;
        }
    }

    requestAnimationFrame(animate);
});

const motives = [
    "Bugün harika bir gün olabilir, yeter ki sen iste.",
    "İyi düşün, iyi olsun.",
    "Kendine bir kahve ısmarla, her şey çözülür.",
    "Her gün yeni bir başlangıçtır.",
    "Sen yeter ki vazgeçme."
];

let motiveCount = 0;
motiveBtn.addEventListener("click", () => {
    if (motiveCount >= 2) {
        motiveText.textContent = "Başka cümle yok. Cafede dertleşiriz ☕";
        return;
    }
    const randomIndex = Math.floor(Math.random() * motives.length);
    motiveText.textContent = motives[randomIndex];
    motiveCount++;
});

// Ödül ekranına büyük kazanç mesajı ekle
function showWinMessage(msg) {
    const winMsg = document.getElementById("winMessage");
    winMsg.innerText = "🎉 Tebrikler! " + msg + " 🎉";
    winMsg.style.animation = "fadeInOut 3s ease-in-out forwards";
}

// Yeni spin fonksiyonu, doğrudan sınırla birleşik
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
    let spinning = true;
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
