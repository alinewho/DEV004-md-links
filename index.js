// eslint-disable-next-line import/extensions
import chalk from 'chalk';
import {
  readFileApi, routeExists, isAbsolute, isItFile, isMD, findURLs, validateLinks,
// eslint-disable-next-line import/extensions
} from './api.js';

const errorChalk = chalk.bold.bgRedBright;
const textChalk = chalk.bgCyan;

const mdLinks = (route = './data/testLinks.md') => new Promise((resolve, reject) => {
  if (routeExists(route)) {
    // Verifica si es ruta absoluta y si no, la convierte
    const routeAbs = isAbsolute(route);
    // verificar si routeAbs es archivo (fs.stats.Isfile())
    if (isItFile(routeAbs)) {
      console.log(chalk.bgMagenta(`La ruta ${routeAbs} sí corresponde a un archivo.`));
      // Si es archivo verificas que sea md (path.extname)
      if (isMD(routeAbs)) {
        console.log(textChalk('El archivo sí es MD'));
        // Lee el archivo
        readFileApi(routeAbs)
          .then((rpta) => {
            resolve(rpta);
            // Busca links
            const linksRes = findURLs(rpta, routeAbs);
            if (process.argv.includes('validate') || process.argv.includes('--v')) {
              console.log('aquí va petición HTTP');
              console.log(validateLinks(linksRes));
            } else {
              console.log('no hubo validate', linksRes);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(errorChalk('No se encontraron archivos MD que analizar'));
      }
    } else {
      console.log(errorChalk(`La ruta ${routeAbs} no corresponde a un archivo.`));
      // Aquí debería ir: si es directorio entra y lee recursivamente
    }
  } else {
    reject(errorChalk(`La ruta ${route} no existe, verifica de nuevo`));
  }
});

mdLinks('./data/anotherMD.md').then((res) => {
  // console.log(res);
}).catch((rej) => {
  console.log(rej);
});

export { mdLinks };
