const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

const genderOptions = ['Woman', 'Agender', 'Non-binary', 'Man'];
const nonGenderOptions = [
  'Person of colour',
  'Indigenous person',
  'LGBTQIA+',
  'Person with a disability',
];

exports.seed = knex => {
  return knex('identifying_info')
    .del()
    .then(() => {
      return knex('identifying_info').insert(
        createSeedData(20, () => {
          const name = faker.helpers.randomize(
            genderOptions.concat(nonGenderOptions),
          );
          return {
            name,
            is_gender_related: genderOptions.includes(name),
            user_generated: faker.random.boolean(),
          };
        }),
      );
    });
};
