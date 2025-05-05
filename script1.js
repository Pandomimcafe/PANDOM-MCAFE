function showMessage1() {
    document.getElementById("message1").innerText = "Güzel şeyler zaman alır.";
}

function spinWheel1() {
    const canvas = document.getElementById("wheelCanvas1");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, 2 * Math.PI);
    ctx.fillStyle = "hsl(" + Math.floor(Math.random() * 360) + ", 80%, 60%)";
    ctx.fill();
    ctx.stroke();
}