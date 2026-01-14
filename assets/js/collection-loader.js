function loadCollection(type, gridId) {
  fetch("/assets/collection/manifest.json", { cache: "no-store" })
    .then(r => r.json())
    .then(data => {
      const items = data[type];
      const grid = document.getElementById(gridId);
      if (!items || !grid) return;

      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
          <div class="item-thumb">
            <img src="${item.img}" alt="${item.title}" loading="lazy">
          </div>
          <div class="item-title">${item.title}</div>
          <div class="item-desc">${item.desc || ""}</div>
        `;

        card.onclick = () => openModal(item);
        grid.appendChild(card);
      });
    });
}

/* ===== MODAL ===== */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const waBtn = document.getElementById("waBtn");
const modalClose = document.getElementById("modalClose");

function openModal(item) {
  document.getElementById("productSchema").textContent =
JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": item.title,
  "image": item.img,
  "description": item.longDesc || item.desc,
  "brand": { "@type": "Brand", "name": "FACETRA" },
  "category": "Diamond",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
});

  modal.classList.add("open");

  modalImg.src = item.img;
  modalImg.alt = item.title;

  modalTitle.textContent = item.title;
  modalMeta.textContent = `Cut: ${item.cut} | Shape: ${item.shape} | Origin: ${item.origin}`;
  modalDesc.textContent = item.longDesc || item.desc || "";

  waBtn.href =
    `https://wa.me/918055113448?text=` +
    encodeURIComponent(`Hello FACETRA,\nI'm interested in ${item.title}`);
}

modalClose.onclick = () => modal.classList.remove("open");
modal.onclick = e => { if (e.target === modal) modal.classList.remove("open"); };
