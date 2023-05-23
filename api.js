import fs, { stat, Stats } from 'fs';
import path from 'path';
import chalk from 'chalk';

//* ****¿La ruta existe?*****
// Si no existe la ruta, rechaza la promesa
const routeExists = (route) => {
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
const isItFile = (route) => fs.lstatSync(route).isFile();
// fs.stat(route, (err, stats) => stats.isFile()

//* ****Checar si hay archivos MD*****
const isMD = (route) => {
  if (path.extname(route) === ('.md')) {
    // console.log('si es MD api');
    return true;
  }
  // console.log('NO es MD api');
  return false;
};
//* ****Leer un archivo*****
const readFileApi = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf-8', (err, data) => { // 'utf-8', después de path también sirve para cmabiar buffer a texto string
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

//* ****Buscar URLs*****/
const findURLs = (text, route) => {
  const dataURLs = text.match(/\[(.*?)\]\((.*?)\)/g);
  const finalData = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const data of dataURLs) {
    finalData.push({ text: data.match(/\[(.*)\]/)[1], href: data.match(/https*?:([^"')\s]+)/)[0], file: route });
  }
  return finalData;
  // return dataURLs;
};

// const finalData = findURLs(textE, rutado);
// console.log('datos', finalData);
// const justLinks = finalData.map((obj) => obj.href);

// const getStatus = (url) => fetch(url);

// const readStatus = justLinks.map((url) => getStatus(url));

const validateLinks = (array) => {
  const justLinks = array.map((obj) => obj.href);
  const getStatus = (url) => fetch(url);
  const readStatus = justLinks.map((url) => getStatus(url));

  return Promise.all(readStatus)
    .then((responses) => responses.map((res, index) => {
      const status = { status: res.status };
      const code = { code: res.statusText };
      const arrayIndex = array[index];
      return { ...arrayIndex, ...status, ...code };
    }))
    .catch((error) => {
      console.log('error: ', error);
      throw error;
    });
};
// console.log('status: ', res.status, res.statusText));
// Promise.all(readStatus).then((answ) => {
//   answ.forEach((res) => console.log('res: ', res.status, 'text: ', res.statusText));
// });

// Otra opcion

// return Promise.all(readStatus)
// .then((answ) => answ.forEach((res, index) => {
//   const status = { status: res.status };
//   const code = { code: res.statusText };
//   const arrayIndex = array[index];
//   return { ...arrayIndex, ...status, ...code };
// }))
// .catch((error) => {
//   console.log('error: ', error);
// });

export {
  readFileApi,
  routeExists,
  isAbsolute,
  isItFile,
  isMD,
  findURLs,
  validateLinks,
};
