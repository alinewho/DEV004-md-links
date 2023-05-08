// eslint-disable-next-line import/extensions
import { readFileApi, fileExists, isAbsolute } from './api.js';

const mdLinks = (route = './data/testLinks.md') => new Promise((resolve, reject) => {
  if (fileExists(route)) {
    const routeAbs = isAbsolute(route);
    // verificar si routeAbs es archivo (fs.stats.Isfile())
    // Si es archivo verificas que sea md (path.extname)
    readFileApi(routeAbs)
      .then((rpta) => {
        console.log({ rpta });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    resolve('Tu ruta no existe, verifica de nuevo');
  }
});

mdLinks('./data/testLinks.md').then((res) => {
  console.log(res);
});

export { mdLinks };
