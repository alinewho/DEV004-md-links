// eslint-disable-next-line import/extensions
import { readFileApi, fileExists, isAbsolute, isItFile } from './api.js';

const mdLinks = (route = './data/testLinks.md') => new Promise((resolve, reject) => {
  if (fileExists(route)) {
    const routeAbs = isAbsolute(route);
    // verificar si routeAbs es archivo (fs.stats.Isfile())
    if(isItFile(routeAbs)) {

    } 
    
    // Si es archivo verificas que sea md (path.extname)
    // Lee el archivo (no puedo anidarlo dentro de isItFile)
    readFileApi(routeAbs)
      .then((rpta) => {
        console.log({ rpta });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    resolve(`La ruta ${route} no existe, verifica de nuevo`);
  }
});

mdLinks('./data/testLinks.md').then((res) => {
  console.log(res);
});

export { mdLinks };
