
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const resultText = document.getElementById('resultText');
const pointer = document.getElementById('pointer');

const segments = [
    "3 Top Dondurma",
    "%20 İndirim",
    "Soğuk Kahve",
    "Milkshake",
    "%10 İndirim",
    "Şansını Dene",
    "2 Bira + Cips (250₺)",
    "Bir Dahaki Gelişe",
    "Boş 😶"
];

const colors = ["#1abc9c", "#8e44ad", "#3498db", "#f39c12", "#e67e22", "#34495e", "#e74c3c", "#9b59b6", "#2c3e50"];
let startAngle = 0;
let arc = Math.PI * 2 / segments.length;
let rotation = 0;
let spinCount = 0;

function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + arc);
        ctx.lineTo(250, 250);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillText(segments[i], 230, 10);
        ctx.restore();
    }
}
drawWheel();

function spinWheel() {
    if (spinCount >= 2) {
        resultText.textContent = "Başka cümle yok... Cafede dertleşiriz ☕";
        return;
    }

    const extraSpin = Math.floor(Math.random() * 360);
    const spins = 5; // full rotations
    const totalRotation = (spins * 360 + extraSpin);
    rotation += totalRotation;

    canvas.style.transition = "transform 5s ease-out";
    canvas.style.transform = `rotate(${rotation}deg)`;

    spinButton.disabled = true;

    setTimeout(() => {
        const degrees = (rotation + 90) % 360;
        const segmentAngle = 360 / segments.length;
        const index = Math.floor(segments.length - (degrees / segmentAngle)) % segments.length;
        resultText.textContent = "Kazandığın: " + segments[index];
        spinButton.disabled = false;
        spinCount++;
    }, 5200);
}

function newMotive() {
    const motive = [
        "Bugün harika bir gün olabilir, yeter ki sen iste.",
        "İyi düşün, iyi olsun.",
        "Kendine inan, her şey mümkün.",
        "Gülümsersen, dünya da sana güler."
    ];
    const chosen = motive[Math.floor(Math.random() * motive.length)];
    document.getElementById("motive").textContent = chosen;
}
