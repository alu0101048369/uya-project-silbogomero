/* eslint-disable prettier/prettier, no-unused-vars, no-var, vars-on-top */
export default function detectLegacyBrowser() {
  try {
    var vjrtsk79kzxb6vd5 = fetch;
  } catch (err) {
    document.body.innerHTML = '<div style="text-align: center;max-width: 600px;margin: 0 auto;padding-top: 50px;"><h1>Navegador no soportado</h1><p>Gracias por visitar la página de la Asociación Cultural Silbo Gomero.</p><p>Lamentablemente, su navegador no soporta las tecnologías web necesarias para poder visualizar esta página. Considere usar navegadores más modernos y seguros como <a href="https://www.google.com/chrome/">Google Chrome</a> o <a href="https://www.mozilla.org/">Firefox</a>.</p></div>'
    throw new Error('Browser not supported')
  }
}
