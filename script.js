const motivationalQuotes = [
  "Motivasyon cümlesi 1",
  "Motivasyon cümlesi 2",
  "Motivasyon cümlesi 3",
  "Motivasyon cümlesi 4",
  "Motivasyon cümlesi 5",
  "Motivasyon cümlesi 6",
  "Motivasyon cümlesi 7",
  "Motivasyon cümlesi 8",
  "Motivasyon cümlesi 9",
  "Motivasyon cümlesi 10",
  "Motivasyon cümlesi 11",
  "Motivasyon cümlesi 12",
  "Motivasyon cümlesi 13",
  "Motivasyon cümlesi 14",
  "Motivasyon cümlesi 15",
  "Motivasyon cümlesi 16",
  "Motivasyon cümlesi 17",
  "Motivasyon cümlesi 18",
  "Motivasyon cümlesi 19",
  "Motivasyon cümlesi 20",
  "Motivasyon cümlesi 21",
  "Motivasyon cümlesi 22",
  "Motivasyon cümlesi 23",
  "Motivasyon cümlesi 24",
  "Motivasyon cümlesi 25",
  "Motivasyon cümlesi 26",
  "Motivasyon cümlesi 27",
  "Motivasyon cümlesi 28",
  "Motivasyon cümlesi 29",
  "Motivasyon cümlesi 30",
  "Motivasyon cümlesi 31",
  "Motivasyon cümlesi 32",
  "Motivasyon cümlesi 33",
  "Motivasyon cümlesi 34",
  "Motivasyon cümlesi 35",
  "Motivasyon cümlesi 36",
  "Motivasyon cümlesi 37",
  "Motivasyon cümlesi 38",
  "Motivasyon cümlesi 39",
  "Motivasyon cümlesi 40",
  "Motivasyon cümlesi 41",
  "Motivasyon cümlesi 42",
  "Motivasyon cümlesi 43",
  "Motivasyon cümlesi 44",
  "Motivasyon cümlesi 45",
  "Motivasyon cümlesi 46",
  "Motivasyon cümlesi 47",
  "Motivasyon cümlesi 48",
  "Motivasyon cümlesi 49",
  "Motivasyon cümlesi 50",
  "Motivasyon cümlesi 51",
  "Motivasyon cümlesi 52",
  "Motivasyon cümlesi 53",
  "Motivasyon cümlesi 54",
  "Motivasyon cümlesi 55",
  "Motivasyon cümlesi 56",
  "Motivasyon cümlesi 57",
  "Motivasyon cümlesi 58",
  "Motivasyon cümlesi 59",
  "Motivasyon cümlesi 60",
  "Motivasyon cümlesi 61",
  "Motivasyon cümlesi 62",
  "Motivasyon cümlesi 63",
  "Motivasyon cümlesi 64",
  "Motivasyon cümlesi 65",
  "Motivasyon cümlesi 66",
  "Motivasyon cümlesi 67",
  "Motivasyon cümlesi 68",
  "Motivasyon cümlesi 69",
  "Motivasyon cümlesi 70",
  "Motivasyon cümlesi 71",
  "Motivasyon cümlesi 72",
  "Motivasyon cümlesi 73",
  "Motivasyon cümlesi 74",
  "Motivasyon cümlesi 75",
  "Motivasyon cümlesi 76",
  "Motivasyon cümlesi 77",
  "Motivasyon cümlesi 78",
  "Motivasyon cümlesi 79",
  "Motivasyon cümlesi 80",
  "Motivasyon cümlesi 81",
  "Motivasyon cümlesi 82",
  "Motivasyon cümlesi 83",
  "Motivasyon cümlesi 84",
  "Motivasyon cümlesi 85",
  "Motivasyon cümlesi 86",
  "Motivasyon cümlesi 87",
  "Motivasyon cümlesi 88",
  "Motivasyon cümlesi 89",
  "Motivasyon cümlesi 90",
  "Motivasyon cümlesi 91",
  "Motivasyon cümlesi 92",
  "Motivasyon cümlesi 93",
  "Motivasyon cümlesi 94",
  "Motivasyon cümlesi 95",
  "Motivasyon cümlesi 96",
  "Motivasyon cümlesi 97",
  "Motivasyon cümlesi 98",
  "Motivasyon cümlesi 99",
  "Motivasyon cümlesi 100"
];

const motives = [
  "Bugün harika bir gün olabilir, yeter ki sen iste.",
  "Hayallerin için adım at!",
  "Küçük adımlar büyük farklar yaratır.",
  "Senin için her şey mümkün.",
  "Kendine güven!",
  "Gülümse, çünkü hayat güzel.",
  "İyi şeyler zaman alır.",
  "Bugün senin günün.",
  "Her sabah yeni bir başlangıç.",
  "Zorluklar seni güçlü yapar."
];

function newMotive() {
  const random = Math.floor(Math.random() * motives.length);
  document.getElementById("motiveText").innerText = motives[random];
}

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const rewards = [
  "Milkshake", "2 Bira + Cips", "%10 İndirim",
  "Şansını Dene", "Sıcak Kahve", "Boş 😅",
  "3 Top Dondurma", "Çekiliş Hakkı", "Bir Tatlı", "Bir Soğuk İçecek"
];

let angles = [];
let startAngle = 0;
const arc = Math.PI / (rewards.length / 2);
for (let i = 0; i < rewards.length; i++) angles.push(i * arc);

function drawWheel() {
  for (let i = 0; i < rewards.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${(i * 360) / rewards.length}, 70%, 60%)`;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, angles[i], angles[i] + arc);
    ctx.lineTo(250, 250);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(250, 250);
    ctx.rotate(angles[i] + arc / 2);
    ctx.textAlign = "right";
    ctx.fillText(rewards[i], 190, 10);
    ctx.restore();
  }
}
drawWheel();

let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;
  let rotation = Math.random() * 360 + 720;
  let duration = 7000;
  let start = null;
  const tick = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const ease = 1 - Math.pow(1 - progress / duration, 3);
    const angle = rotation * ease;
    canvas.style.transform = `rotate(${angle}deg)`;
    if (progress < duration) {
      requestAnimationFrame(tick);
    } else {
      const finalAngle = (angle % 360);
      const index = Math.floor((360 - finalAngle + 90) % 360 / (360 / rewards.length));
      setTimeout(() => {
        alert("Kazandın: " + rewards[index]);
        spinning = false;
      }, 100);
    }
  };
  requestAnimationFrame(tick);
}
