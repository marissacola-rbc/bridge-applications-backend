const faker = require('faker');

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
      const fullList = genderOptions.concat(nonGenderOptions);
      return knex('identifying_info').insert(
        fullList.map(item => ({
          name: item,
          is_gender_related: genderOptions.includes(item),
          user_generated: faker.random.boolean(),
        })),
      );
    });
};
