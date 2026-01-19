function cleanUrl(url) {
  return url ? url.replace(/^"+|"+$/g, "").trim() : "";
}

const CONFIG_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCBbY4xDLoaWVdOiqD0NskF81ssGVANNZm0nwLNerJAxMcqxStm_n75AM5le0OMrhQA1gKteKgl-U/pub?gid=1047221178&single=true&output=csv";

window.CONFIG = {}; // 👈 global y única fuente

fetch(CONFIG_URL)
  .then(res => {
    if (!res.ok) throw new Error("Error cargando config");
    return res.text();
  })
  .then(csv => {
    const lines = csv.trim().split("\n");

    lines.slice(1).forEach(line => {
      const [key, value] = line.split(",");

      if (!key) return;

      window.CONFIG[key.trim()] = cleanUrl(value);
    });

    console.log("CONFIG OK:", window.CONFIG);
    applyConfig(window.CONFIG);
  })
  .catch(err => console.error("CONFIG FETCH ERROR:", err));

function applyConfig(config) {
  if (!config) return;

  // Nombre del negocio
  if (config.nombre_negocio) {
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = config.nombre_negocio;
  }

  // Logo
  if (config.logo_url) {
    const logo = document.querySelector(".logo");
    if (logo) logo.src = config.logo_url;
  }

  // Banner
  if (config.banner_home) {
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.backgroundImage = `url(${config.banner_home})`;
    }
  }

  // Instagram
  if (config.instagram_url) {
    const instagram = document.getElementById("instagram-link");
    if (instagram) instagram.href = config.instagram_url;
  }

  // WhatsApp (si lo usás en otro lado)
  if (config.whatsapp_url) {
    const whatsapp = document.getElementById("whatsapp-link");
    if (whatsapp) whatsapp.href = config.whatsapp_url;
  }
}




