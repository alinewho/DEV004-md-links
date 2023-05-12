import mdLinks from '../index';
import {routeExists, isAbsolute} from '../api';
import { describe, expect, it } from '@jest/globals';


// describe('mdLinks', () => {
//   it('debería devolver una promesa', () => {
//     expect(mdLinks()).toBe(typeof Promise);
//   });
// });
describe('routeExists', () => {
  // it('debería ser una función', () => {
  //   expect(typeof routeExists).toBe("function");
  // });
  it('debería devolver true si la ruta existe', () => {
    expect(routeExists('./data/testLinks.md')).toBe(true);
  });
  it('debería devolver false si la ruta no existe', () => {
    expect(routeExists('./data/archivofalso.md')).toBe(false);
  })
});
describe('isAbsolute', () => {
  it('Si la ruta es relativa se convierte en absoluta', () => {
    expect(isAbsolute('./data/testLinks.md')).toBe(
      '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md')
  });
  it('Si la ruta es absoluta se retorna la misma ruta', () => {
    expect(isAbsolute('/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md')).toBe(
      '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md')
  });
})

