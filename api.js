import fs, { stat, Stats } from 'fs';
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
  fs.stat(route, (err, stats) => {
    if (err){
      console.log(`Error al obtener información de la ruta ${route}: ${err}`);
      return;
    }
    if (stats.isFile()){
      console.log(`La ruta ${route} sí corresponde a un archivo.`);
      return true;
    } else {
      console.log(`La ruta ${route} no corresponde a un archivo.`);
      return false;
    }
  });
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

// isItFile('./data/testLinks.md');
//* ****Buscar URLs*****/

export {
  readFileApi,
  fileExists,
  isAbsolute,
  isItFile,
};
