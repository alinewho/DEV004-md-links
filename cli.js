import { mdLinks } from './index.js';

const readingFile = process.argv[2];
console.log('process', process.argv[2]);

if (process.argv.includes('--validate')) {
  // console.log('opcion v');
  mdLinks(readingFile)
    .then((res) => {
      console.log('esta es la respuesta de validate', res);
    })
    .catch((rej) => {
      console.log(rej);
    });
} else if (process.argv.includes('--stats')) {
  console.log('stats');
  mdLinks(readingFile)
    .then((res) => {
      const totalN = res.length;
      console.log('num de links', totalN);
    })
    .catch((rej) => {
      console.log(rej);
    });
} else {
  mdLinks(readingFile);
}
