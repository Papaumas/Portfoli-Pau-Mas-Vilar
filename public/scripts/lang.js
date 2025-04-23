// import 'flowbite';

// Funció per carregar i aplicar l'idioma
function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then((response) => {
      // console.log(response); 
      if (!response.ok) throw new Error("Error carregant l'arxiu de l'idioma");
      return response.json();
    })
    .then((translations) => {
      // console.log(translations);  // Comprova el contingut del JSON
      updateAllTextElements(translations);
    })
    .catch((error) => {
      console.error("Error carregant l'idioma:", error);
    });
}


// Funció per actualitzar tots els elements basant-se en el JSON
function updateAllTextElements(translations, parentId = '') {
  for (const key in translations) {
    const value = translations[key];
    const elementId = parentId ? `${parentId}-${key}` : key;
    // console.log('Updating:', elementId, 'with value:', value); 
    // Si el valor és un objecte, recórrer-lo recursivament
    if (typeof value === 'object') {
      updateAllTextElements(value, elementId);  // crida recursiva per objectes
    } else {
      // Si l'element existeix, actualitza el seu contingut
      const element = document.getElementById(elementId);
      if (element) {
        element.innerText = value;
      }
    }
  }
}

// Funció per canviar l'idioma
function changeLanguage(lang) {
  localStorage.setItem("language", lang);
  loadLanguage(lang);
}

// Carregar l'idioma inicial
const currentLanguage = localStorage.getItem("language") || "ca";
loadLanguage(currentLanguage);
