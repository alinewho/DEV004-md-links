// eslint-disable-next-line import/extensions
import { readFileApi, fileExists, isAbsolute, isItFile, isMD, findURLs } from './api.js';

const mdLinks = (route = './data/testLinks.md') => new Promise((resolve, reject) => {
  if (fileExists(route)) {
    // Verifica si es ruta absoluta y si no, la convierte
    const routeAbs = isAbsolute(route);
    // verificar si routeAbs es archivo (fs.stats.Isfile())
    if(isItFile(routeAbs)) {
      console.log(`La ruta ${routeAbs} sí corresponde a un archivo.`);
      // Si es archivo verificas que sea md (path.extname)
      if(isMD(routeAbs)){
        console.log('si es MD');
        // Lee el archivo
        readFileApi(routeAbs)
      .then((rpta) => {
        resolve(rpta);
        // Busca links
        const linksRes = findURLs(rpta);
        console.log(linksRes);
      })
      .catch((error) => {
        console.log(error);
      });
      } else {
        console.log('No se encontraron archivos MD que analizar');
      }
    } else {
      console.log(`La ruta ${routeAbs} no corresponde a un archivo.`);
      // Aquí debería ir: si es directorio entra y lee recursivamente
    }
  } else {
    reject(`La ruta ${route} no existe, verifica de nuevo`);
  }
});

mdLinks('./data/testLinks.md').then((res) => {
  console.log(res);
}).catch(rej => {
  console.log(rej);
})

export { mdLinks };
