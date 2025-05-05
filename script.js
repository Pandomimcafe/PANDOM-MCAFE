
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
            resultText.textContent = `Tebrikler! Kazandığınız: ${reward}`;
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
