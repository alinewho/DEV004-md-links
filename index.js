// eslint-disable-next-line import/extensions
import { readFileApi, fileExists, isAbsolute, isItFile } from './api.js';

const mdLinks = (route = './data/testLinks.md') => new Promise((resolve, reject) => {
  if (fileExists(route)) {
    const routeAbs = isAbsolute(route);
    // verificar si routeAbs es archivo (fs.stats.Isfile())
    if(isItFile(routeAbs)) {
      console.log(`La ruta ${routeAbs} sí corresponde a un archivo.`);
      readFileApi(routeAbs)
      .then((rpta) => {
        resolve(rpta);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      console.log(`La ruta ${routeAbs} no corresponde a un archivo.`);
    }
    // Si es archivo verificas que sea md (path.extname)
    // Lee el archivo (no puedo anidarlo dentro de isItFile)
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
