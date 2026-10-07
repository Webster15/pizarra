// Repositorio de GitHub con las versiones publicadas ("usuario/repo").
window.PIZARRA_REPO = 'Webster15/pizarra';

/** Busca el .zip de la última versión y lo pone en los botones de descarga. */
window.pizarraDownload = async function () {
  const links = document.querySelectorAll('[data-download]');
  const fallback = window.PIZARRA_REPO ? `https://github.com/${window.PIZARRA_REPO}/releases/latest` : '#';
  links.forEach((a) => (a.href = fallback));
  if (!window.PIZARRA_REPO) return;
  try {
    const r = await fetch(`https://api.github.com/repos/${window.PIZARRA_REPO}/releases/latest`);
    const rel = await r.json();
    const zip = rel.assets.find((x) => /^Pizarra-Windows-.*\.zip$/.test(x.name));
    if (!zip) return;
    links.forEach((a) => (a.href = zip.browser_download_url));
    document.querySelectorAll('[data-version]').forEach((el) => {
      el.textContent = `Versión ${rel.tag_name.replace(/^v/, '')} · ${Math.round(zip.size / 1048576)} MB · Windows 10 y 11`;
    });
  } catch {
    // sin conexión con GitHub: queda el enlace a la página de versiones
  }
};
