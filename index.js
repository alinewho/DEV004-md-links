// eslint-disable-next-line import/extensions
import chalk from 'chalk';
import {
  readFileApi, routeExists, isAbsolute, isItFile, isMD, findURLs, validateLinks,
// eslint-disable-next-line import/extensions
} from './api.js';

const errorChalk = chalk.bold.bgRedBright;
const textChalk = chalk.cyan;
const totalStat = chalk.bold.bgGreen;
const uniqueStat = chalk.bgMagenta;
const brokenStat = chalk.bgBlue;

const findUnique = (data) => {
  const myUniqueSet = new Set();
  // eslint-disable-next-line no-restricted-syntax
  for (const datae of data) {
    myUniqueSet.add(datae.href);
  }
  const uniqueFinds = [...myUniqueSet];
  const uniqueLength = uniqueFinds.length;
  console.log(uniqueStat('Unique: ', uniqueLength));
};

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (routeExists(route)) {
    // Verifica si es ruta absoluta y si no, la convierte
    const routeAbs = isAbsolute(route);
    // verificar si routeAbs es archivo (fs.stats.Isfile())
    if (isItFile(routeAbs)) {
      console.log(chalk.yellow(`La ruta ${routeAbs} sí corresponde a un archivo.`));
      // Si es archivo verificas que sea md (path.extname)
      if (isMD(routeAbs)) {
        console.log(textChalk('El archivo sí es MD, leyendo...'));
        // Lee el archivo
        readFileApi(routeAbs)
          .then((rpta) => {
            // Busca links
            const linksRes = findURLs(rpta, routeAbs);
            if (process.argv.includes('--stats') && (process.argv.includes('--validate'))) {
              validateLinks(linksRes)
                .then((data) => {
                  console.log('stats y validate');
                  const numLinks = data.length;
                  console.log(totalStat('Total: ', numLinks));
                  findUnique(data);
                  const brokenFinds = data.filter((eachObj) => {
                    const broken = eachObj.status !== 200;
                    return broken;
                  });
                  const brokenLength = brokenFinds.length;
                  console.log(brokenStat('Broken: ', brokenLength));
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (process.argv.includes('--validate') || process.argv.includes('--v')) {
              validateLinks(linksRes)
                .then((data) => {
                  console.log('array de validaciones', data);
                });
            } else if (process.argv.includes('--stats')) {
              validateLinks(linksRes)
                .then((data) => {
                  const numLinks = data.length;
                  console.log(totalStat('Total: ', numLinks));
                  findUnique(data);
                })
                .catch((err) => {
                  console.log(err);
                });
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

const route = process.argv[2];
mdLinks(route).then((res) => {
  console.log(res);
}).catch((rej) => {
  console.log(rej);
});

export { mdLinks };
