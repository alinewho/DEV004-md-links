import {
  beforeEach,
  describe, expect, it, jest,
} from '@jest/globals';
// import mdLinks from '../index';
import fs from 'fs';
import {
  routeExists, isAbsolute, isItFile, isMD, findURLs, readFileApi, validateLinks,
} from '../api';

// describe('mdLinks', () => {
//   it('debería devolver una promesa', () => {
//     expect(mdLinks()).toBe(typeof Promise);
//   });
// });
// routeExists
describe('routeExists', () => {
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
// readFileApi
describe('readFileApi', () => {
  it('debe resolver con los datos del archivo anotherMD.md si la lectura es exitosa', (done) => {
    const mockData = `Hola md
    [Babel](https://jestjs.io/es-ES/docs/getting-started#usando-babel)
    [Node.js](https://overapi.com/nodejs)
    Texto mucho texto
    [Laboratoria](https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any)
    [Un link roto](https://overapi.com/nodejsA)`;
    jest.spyOn(fs, 'readFile').mockImplementation((route, encoding, callback) => {
      callback(null, mockData);
    });
    readFileApi('./data/testLinks.md')
      .then((data) => {
        expect(data).toBe(mockData);
        expect(fs.readFile).toHaveBeenCalledWith('./data/testLinks.md', 'utf-8', expect.any(Function));
        done();
      })
      .catch(done);
  });
});
// findURLs
describe('findURLs', () => {
  it('encuentra los links de mi archivo testLinks.md', () => {
    const URLreturn = [
      {
        text: 'Babel',
        href: 'https://jestjs.io/es-ES/docs/getting-started#usando-babel',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      },
      {
        text: 'Node.js',
        href: 'https://overapi.com/nodejs',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      },
      {
        text: 'Laboratoria',
        href: 'https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      },
      {
        text: 'Un link roto',
        href: 'https://overapi.com/nodejsA',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      },
    ];
    const text = `Hola md
    [Babel](https://jestjs.io/es-ES/docs/getting-started#usando-babel)
    [Node.js](https://overapi.com/nodejs)
    Texto mucho texto
    [Laboratoria](https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any)
    [Un link roto](https://overapi.com/nodejsA)`;
    expect(findURLs(text, '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md')).toEqual(URLreturn);
  });
  it('encuentra los links de mi archivo anotherMD.md', () => {
    const URLreturn = [
      {
        text: 'Mi proyecto en Github',
        href: 'https://github.com/alinewho/DEV004-md-links',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/anotherMD.md',
      },
      {
        text: 'Como usar process.argv',
        href: 'https://www.geeksforgeeks.org/node-js-process-argv-property/',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/anotherMD.md',
      },
      {
        text: 'Comida y AI',
        href: 'https://www.youtube.com/watch?v=iBi1jK_jOX8&ab_channel=StephPappas',
        file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/anotherMD.md',
      },
    ];
    const text = `Este es un segundo archivo de MD que contiene links válidos y nó válidos
    [Mi proyecto en Github](https://github.com/alinewho/DEV004-md-links)
    Segundo
    [Como usar process.argv](https://www.geeksforgeeks.org/node-js-process-argv-property/)
    Tercero
    [Comida y AI](https://www.youtube.com/watch?v=iBi1jK_jOX8&ab_channel=StephPappas)
    `;
    expect(findURLs(text, '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/anotherMD.md')).toEqual(URLreturn);
  });
});
// Validate links
describe('validateLinks', () => {
  const objectArrays = [
    {
      text: 'Babel',
      href: 'https://jestjs.io/es-ES/docs/getting-started#usando-babel',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
    },
    {
      text: 'Node.js',
      href: 'https://overapi.com/nodejs',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
    },
    {
      text: 'Laboratoria',
      href: 'https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
    },
    {
      text: 'Un link roto',
      href: 'https://overapi.com/nodejsA',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
    },
  ];
  const alreadyValidated = [
    {
      text: 'Babel',
      href: 'https://jestjs.io/es-ES/docs/getting-started#usando-babel',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      status: 200,
      code: 'OK',
    },
    {
      text: 'Node.js',
      href: 'https://overapi.com/nodejs',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      status: 200,
      code: 'OK',
    },
    {
      text: 'Laboratoria',
      href: 'https://laboratoria-dev004-oh.youcanbook.me/service/jsps/cal.jsp?cal=3a786801-902d-47fb-8dd3-0b7db5754dbb&ini=1683228322651&team=any',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      status: 200,
      code: 'OK',
    },
    {
      text: 'Un link roto',
      href: 'https://overapi.com/nodejsA',
      file: '/Users/aline_who/Documents/Laboratoria/DEV004-md-links/data/testLinks.md',
      status: 404,
      code: 'Not Found',
    },
  ];
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ alreadyValidated }),
  }));

  beforeEach(() => {
    fetch.mockClear();
  });

  it('llama a fetch las veces que se requiere', async () => {
    await validateLinks(objectArrays);
    expect(fetch).toHaveBeenCalledTimes(4);
  });
});

// mdLinks
