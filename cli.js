import chalk from 'chalk';

const uniqueStat = chalk.bgMagenta;
const brokenStat = chalk.bgBlue;
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
const areUBroken = (data) => {
  const brokenFinds = data.filter((eachObj) => {
    const broken = eachObj.status !== 200;
    const brokenLength = broken.length;
    return brokenLength;
  });
  console.log(brokenStat('Broken: ', areUBroken));
};

export {
  findUnique,
  areUBroken,
};
