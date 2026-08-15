// Utilidades de URL compartidas entre el service worker (background.js) y las
// páginas de la extensión (popup.html). Vivían duplicadas en cada sitio y las
// copias habían divergido: popup.js no contemplaba devtools:// ni view-source:,
// y seguía comprobando sólo el dominio antiguo de la Chrome Web Store.

// Allowlist: sólo se puede inyectar en páginas http(s) o file. Cualquier otro
// esquema (chrome://, chrome-extension://, edge://, devtools://, about:,
// view-source:, chrome-search://, chrome-untrusted://, o url indefinida) es
// inaccesible para content scripts.
function isInjectableUrl(url) {
  if (!url) return false;

  const hasInjectableScheme = url.startsWith('http://') ||
                              url.startsWith('https://') ||
                              url.startsWith('file://');
  if (!hasInjectableScheme) return false;

  // Orígenes especiales donde Chrome rechaza la inyección aunque sean https
  if (url.startsWith('https://chromewebstore.google.com/') ||
      url.startsWith('https://chrome.google.com/webstore')) {
    return false;
  }

  return true;
}
