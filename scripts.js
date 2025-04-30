
const quotes = [
    "Her yeni gün, yeni bir başlangıçtır.",
    "Sen düşündüğünden daha güçlüsün.",
    "Bugün güzel şeyler seni bulacak.",
    "İçindeki ışık her şeye yeter.",
    "Küçük adımlar büyük farklar yaratır.",
    "Gülümse, çünkü bu dünyada bir iz bırakıyorsun.",
    "Sen özelsin. Çünkü senden bir tane daha yok."
];

const notes = [
    "Gününüzü güzelleştirmek için Pandomim Cafe’ye bekleriz ☕",
    "Bu cümle size iyi geldiyse, kahvemiz daha da iyi gelecek!",
    "Sizi de aramızda görmek isteriz 💛",
    "Bir fincan mutluluk için yolun Pandomim'den geçsin!",
    "Bugün bir adım at, bir kahve iç 🙂"
];

let quoteClicks = 0;

window.onload = () => {
    showNewQuote();
    const note = notes[Math.floor(Math.random() * notes.length)];
    document.getElementById("footerNote").textContent = note;
};

function showNewQuote() {
    if (quoteClicks >= 2) {
        document.getElementById("quoteBox").textContent = "3. söz burada yok... Cafe’de dertleşiriz. Bekliyoruz 😊";
        document.getElementById("moreQuoteBtn").disabled = true;
        return;
    }
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quoteBox").textContent = quote;
    quoteClicks++;
}

const rewards = [
    "Nargile Bedava",
    "2 Bira alana 1 Cips Hediye",
    "Ücretsiz Türk Kahvesi",
    "Tatlı Alana Çay İkram",
    "%10 İndirim",
    "Sıcak Çikolatada %50 İndirim",
    "Bugünlük gülümsemen yeter",
    "Instagram'da etiketle, mini tatlı kazan!",
    "Hikâyende paylaş, kahveni bizden al!",
    "Şansını bir dahaki sefere dene"
];

function spinWheel() {
    const now = new Date();
    const lastSpin = localStorage.getItem("lastSpinDate");
    const spinCount = parseInt(localStorage.getItem("spinCount")) || 0;

    if (lastSpin) {
        const lastDate = new Date(lastSpin);
        const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7 && spinCount >= 2) {
            document.getElementById("wheelResult").textContent =
                "Bu cihazdaki çark hakkı doldu. 1 hafta sonra tekrar dene 😉";
            return;
        }

        if (diffDays >= 7) {
            localStorage.setItem("spinCount", 0);
        }
    }

    const result = rewards[Math.floor(Math.random() * rewards.length)];
    document.getElementById("wheelResult").textContent = "Kazandınız: " + result;

    localStorage.setItem("lastSpinDate", now.toISOString());
    localStorage.setItem("spinCount", spinCount + 1);
}
