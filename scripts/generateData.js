const faker = require('faker');
const fs = require('fs');

const dataDir = './data';
const sampleLength = 100;
const amenityTypes = ['soap', 'towels', 'pillows', 'toilet paper'];

// create `data` folder if doesn't exist
!fs.existsSync(dataDir) && fs.mkdirSync(dataDir);

// generate array of amenities from `amenityTypes`
const amenityList = () => {
  const amenityTypesLength = amenityTypes.length;
  const randomAmenitiesList = [];
  let currentIndex = Math.floor(Math.random() * (amenityTypesLength + 1));

  while (currentIndex < amenityTypesLength) {
    randomAmenitiesList.push(amenityTypes[currentIndex]);
    currentIndex += Math.floor(Math.random() * (amenityTypesLength - 1)) + 1;
  }

  return randomAmenitiesList;
};

// fake data to be in an array of the following objects
const data = Array(sampleLength).fill(0).map((item, index) => ({
  id: index + 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  profilePhoto: faker.image.avatar(),
  amenities: amenityList(), // array of amenities
  rating: Math.floor(Math.random() * 5) + 1, // generator random number between 1 & 5
}));

// write data to file
fs.writeFileSync(`${dataDir}/testData.json`, JSON.stringify(data, null, 2));
console.log(`Test data generated to ${dataDir}/testData.json`);
