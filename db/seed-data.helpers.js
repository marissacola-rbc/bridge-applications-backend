const createSeedData = (amountOfData, getRandomData) => {
  let allUserData = [];
  for (let i = 0; i <= amountOfData; i++) {
    allUserData.push(getRandomData());
  }
  return allUserData;
};

module.exports = {
  createSeedData,
};
