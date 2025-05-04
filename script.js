
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const segments = [
    "3 Top Dondurma", "%20 İndirim", "Soğuk Kahve", "Milkshake", "%10 İndirim",
    "Şansını Dene", "2 Bira + Cips (250₺)", "Bir Daha! / Gelişe", "Boş 😅"
];
const colors = ["#2ecc71", "#8e44ad", "#3498db", "#f39c12", "#e67e22", "#9b59b6", "#e74c3c", "#e84393", "#34495e"];
let angle = 0;
let spinning = false;

function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const arc = 2 * Math.PI / segments.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < segments.length; i++) {
        const startAngle = angle + i * arc;
        const endAngle = startAngle + arc;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arc / 2);
        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.textAlign = "right";
        ctx.fillText(segments[i], radius - 10, 0);
        ctx.restore();
    }
}
function spinWheel() {
    if (spinning) return;
    spinning = true;
    const spinAngle = Math.random() * 360 + 720;
    const duration = 3000;
    const start = performance.now();
    function animate(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        angle = (spinAngle * progress) * Math.PI / 180;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
        }
    }
    requestAnimationFrame(animate);
}
document.getElementById('spinBtn').addEventListener('click', spinWheel);

const motives = [
    "Bugün harika bir gün olabilir.", "Her şey seninle başlar.",
    "Gülümse, yeni fırsatlar kapıda!", "Kendine inan, yeter!",
    "İyi düşün, iyi olsun.", "Enerjin bulaşıcı, pozitif kal!"
];
let used = 0;
document.getElementById('newMotiveBtn').onclick = () => {
    const textEl = document.getElementById('motiveText');
    if (used >= 2) {
        textEl.textContent = "Başka cümle yok... Cafede dertleşiriz ☕";
    } else {
        textEl.textContent = motives[Math.floor(Math.random() * motives.length)];
        used++;
    }
};
