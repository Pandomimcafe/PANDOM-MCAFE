
const rewards = [
  "Tatlını al kahwen bizden",
  "2 Adet Soft İçecek",
  "Nargile Bedava",
  "2 Bira + 1 Cips (250₺)",
  "%20 İndirim",
  "Milkshake / Soğuk Kahve",
  "Şansını Bir Daha Dene",
  "3 Top Dondurma",
  "Boş Dilim 😄",
  "%10 İndirim"
];

const weightedResults = [
  0,         // Tatlı + Kahve (%5)
  1, 1,      // 2 Soft içecek (%10)
  2,         // Nargile (%5)
  3,         // 2 Bira + Cips (%5)
  4, 4, 4,   // %20 indirim (%15)
  5, 5, 5,   // Milkshake (%15)
  6, 6, 6,   // Yeniden dene (%15)
  7,         // 3 top dondurma (%5)
  8, 8, 8,   // Boş dilim 😄 (%15)
  9, 9       // %10 indirim (%10)
];

function spinWheel() {
  const resultIndex = weightedResults[Math.floor(Math.random() * weightedResults.length)];
  const result = rewards[resultIndex];
  alert("Kazandığınız ödül: " + result);
  // Buraya animasyon vb. diğer çark kodlarınızı entegre edin
}
