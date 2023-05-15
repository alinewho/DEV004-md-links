import { describe, expect, it } from '@jest/globals';
// import mdLinks from '../index';
import {
  routeExists, isAbsolute, isItFile, isMD, findURLs,
} from '../api';

// describe('mdLinks', () => {
//   it('debería devolver una promesa', () => {
//     expect(mdLinks()).toBe(typeof Promise);
//   });
// });
// routeExists
describe('routeExists', () => {
  // it('debería ser una función', () => {
  //   expect(typeof routeExists).toBe("function");
  // });
  it('debería devolver true si la ruta existe', () => {
    expect(routeExists('./data/testLinks.md')).toBe(true);
  });
  it('debería devolver false si la ruta no existe', () => {
    expect(routeExists('./data/archivofalso.md')).toBe(false);
  });
});
// isAbsolute
describe('isAbsolute', () => {
  it('Si la ruta es relativa se convierte en absoluta', () => {
    expect(isAbsolute('./data/testLinks.md')).toBe(
      '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
    );
  });
  it('Si la ruta es absoluta se retorna la misma ruta', () => {
    expect(isAbsolute('/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md')).toBe(
      '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
    );
  });
});
// isItFile
describe('isItFile', () => {
  it('si es archivo retorna true', () => {
    expect(isItFile('./data/testLinks.md')).toBe(true);
  });
  it('si NO es archivo retorna false', () => {
    expect(isItFile('./data')).toBe(false);
  });
});
// isMD
describe('isMD', () => {
  it('si es archivo MD retorna true', () => {
    expect(isMD('./data/testLinks.md')).toBe(true);
  });
  it('si NO es archivo MD retorna false', () => {
    expect(isMD('./data/first.txt')).toBe(false);
  });
});
// findURLs
describe('findURLs', () => {
  it('encuentra los links de los archivos', () => {
    const URLreturn = [
      '[Babel](https://jestjs.io/es-ES/docs/getting-started#usando-babel)',
      '[Node.js](https://overapi.com/nodejs)',
      '[Laboratoria](https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any)',
    ];
    const text = `Hola md
    [Babel](https://jestjs.io/es-ES/docs/getting-started#usando-babel)
    [Node.js](https://overapi.com/nodejs)
    Texto mucho texto
    [Laboratoria](https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any) `;
    expect(findURLs(text)).toEqual(URLreturn);
  });
});
