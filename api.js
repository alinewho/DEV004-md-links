import fs, { stat, Stats } from 'fs';
import path from 'path';

//* ****¿La ruta existe?*****
// Si no existe la ruta, rechaza la promesa
const fileExists = (route) => {
  if (fs.existsSync(route)) {
    return true;
  }
  return false;
};

//* ****Checar si es absoluta o convertirla*****
const isAbsolute = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  }
  return path.resolve(route);
};
//* ****Checar si es archivo*****
const isItFile = (route) =>  fs.lstatSync(route).isFile();
  // fs.stat(route, (err, stats) => stats.isFile()

//* ****Checar si hay archivos MD*****

//* ****Leer un archivo*****
const readFileApi = (route = './data/testLinks.md') => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf-8', (err, data) => { // 'utf-8', después de path también sirve para cmabiar buffer a texto string
    if (err) {
      // console.log(err)
      reject(err);
    } else {
      // console.log(data)
      // console.log(data)
      // return data
      resolve(data);
    }
  });
});

// isItFile('./data/testLinks.md');
//* ****Buscar URLs*****/

export {
  readFileApi,
  fileExists,
  isAbsolute,
  isItFile,
};
