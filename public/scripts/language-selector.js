document.addEventListener("DOMContentLoaded", async function () {
    const button = document.getElementById("language-button-header");
    const dropdown = document.getElementById("language-dropdown-header");
    const flag = document.getElementById("current-flag-header");
    const text = document.getElementById("current-language-text-header");
    const options = dropdown.querySelectorAll("button[data-lang-code]");

    const savedLang = localStorage.getItem("language") || "ca";

    async function loadLanguageJson(langCode) {
        const response = await fetch(`lang/${langCode}.json`);
        return await response.json();
    }

    async function setLanguage(langCode) {
        const langData = await loadLanguageJson(langCode);

        localStorage.setItem("language", langCode);

        // Actualitza el botó principal
        const selectedOption = document.querySelector(`[data-lang-code="${langCode}"]`);
        flag.src = selectedOption.dataset.flagSrc;
        flag.alt = `Bandera de ${selectedOption.dataset.langName}`;
        text.textContent = langData.language[langCode];

        // Actualitza les opcions del desplegable (sin ocultar aquí)
        options.forEach(option => {
            const code = option.dataset.langCode;
            const span = option.querySelector("span");
            span.textContent = langData.language[code];
        });

        // Crida la funció de lang.js
        if (typeof changeLanguage === "function") {
            changeLanguage(langCode);
        } else {
            console.warn("No s'ha trobat la funció changeLanguage(langCode). Assegura't que lang.js està carregat.");
        }

        // Oculta el dropdown usando style.display
        dropdown.style.display = "none";
    }

    function toggleDropdown() {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    }

    options.forEach(option => {
        option.addEventListener("click", () => {
            setLanguage(option.dataset.langCode);
        });
    });

    button.addEventListener("click", toggleDropdown);

    // Inicia amb l’idioma guardat
    setLanguage(savedLang);
});