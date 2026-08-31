// --- Tab switching ---
// Select every button with class "tab-btn" and every panel with class "tab-panel"
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {
  // addEventListener("click", ...) runs this function whenever the button is clicked
  btn.addEventListener("click", () => {
    // remove "active" from every button/panel, then add it back only to the
    // one that matches the clicked button's data-tab attribute
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabPanels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// --- File upload preview ---
const fileInput = document.getElementById("fileInput");
const uploadPreview = document.getElementById("uploadPreview");
const dropzoneText = document.getElementById("dropzoneText");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  dropzoneText.textContent = `Selected: ${file.name}`;
  uploadPreview.innerHTML = "";

  // If it's an image, show a live preview using a FileReader
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      uploadPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }

  const status = document.createElement("p");
  status.style.color = "#34D399";
  status.style.marginTop = "0.8rem";
  status.textContent = `✓ "${file.name}" ready for processing (Phase 2/3 will handle this).`;
  uploadPreview.appendChild(status);
});

// --- Confidence chart (Chart.js) ---
const ctx = document.getElementById("confidenceChart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["High Confidence", "Medium Confidence", "Low Confidence"],
    datasets: [{
      label: "Records",
      data: [78, 32, 18],
      backgroundColor: ["#34D399", "#F5B942", "#F0654E"],
      borderRadius: 6,
    }],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#90A0B7" }, grid: { display: false } },
      y: { ticks: { color: "#90A0B7" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  },
});
