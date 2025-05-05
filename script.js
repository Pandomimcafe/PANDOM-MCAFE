
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
