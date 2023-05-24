import chalk from 'chalk';

const uniqueStat = chalk.bgMagenta;
// ** encuentra enlaces únicos
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
// *encuentra enlaces rotos

export { findUnique };
