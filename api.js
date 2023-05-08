import fs, { Stats } from 'fs';
import path from 'path';

//* ****¿La ruta existe?*****
// Si no existe la ruta, rechaza la promesa
const fileExists = (route = './data/testLinks.md') => {
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
//* ****Checar si es archivo o directorio*****
const isItFile = (route) => {
}
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
      resolve(data.toString());
    }
  });
});

//* ****Buscar URLs*****/

export {
  readFileApi,
  fileExists,
  isAbsolute,
};
