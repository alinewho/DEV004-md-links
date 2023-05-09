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
const isMD = (route) => {
  if (path.extname(route) === ('.md')){
    //console.log('si es MD api');
    return true
  } else {
    //console.log('NO es MD api');
    return false
  }
}
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

//* ****Buscar URLs*****/
const findURLs = (text) => {
  const dataURLs = text.match(/https:\/\/[^\s]+/g)
  return dataURLs;
  
}

//findURLs('./data/testLinks.md');
export {
  readFileApi,
  fileExists,
  isAbsolute,
  isItFile,
  isMD,
  findURLs,
};
