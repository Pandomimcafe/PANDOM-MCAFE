
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("motiveBtn").addEventListener("click", () => {
    document.getElementById("motiveText").innerText = "Yeni motivasyon!";
  });

  document.getElementById("spinBtn").addEventListener("click", () => {
    alert("Çark dönüyor gibi yapar :) (demo)");
  });
});
