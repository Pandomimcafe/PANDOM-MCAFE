const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const rewards = [
    "Nargile Bedava",
    "2 Bira + 1 Cips",
    "Ücretsiz Türk Kahvesi",
    "Tatlı Alana Çay",
    "%10 İndirim",
    "Sıcak Çikolatada %50",
    "Bugünlük Gülümseme Yeter",
    "Instagram'da Etiketle",
    "Hikâyende Paylaş = Kahve",
    "Şansını Bir Dahaki Sefere Dene"
];

const colors = ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#03a9f4", "#009688", "#4caf50", "#ffeb3b", "#ff9800", "#795548"];

let startAngle = 0;
let arc = Math.PI * 2 / rewards.length;
let spinTimeout = null;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawRouletteWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rewards.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, 200, angle, angle + arc, false);
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText(rewards[i], 180, 0);
        ctx.restore();
    }

    ctx.fillStyle = "#5d1049";
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY - 200);
    ctx.lineTo(centerX + 10, centerY - 200);
    ctx.lineTo(centerX, centerY - 180);
    ctx.closePath();
    ctx.fill();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    document.getElementById("result").textContent = "Kazandınız: " + rewards[index];
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function spin() {
    spinAngleStart = Math.random() * 900 + 500;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

drawRouletteWheel();