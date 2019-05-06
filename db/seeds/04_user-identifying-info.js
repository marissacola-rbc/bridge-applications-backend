const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

exports.seed = knex => {
  return knex('users_identifying_info')
    .del()
    .then(() => knex.select('id').from('users'))
    .then(rows => {
      users = rows;
      return knex.select('id').from('identifying_info');
    })
    .then(rows => {
      identifying_info = rows;
      return knex('users_identifying_info').insert(
        createSeedData(20, i => {
          return {
            user_id: users[i].id,
            identifying_info_id: faker.helpers.randomize(identifying_info).id,
          };
        }),
      );
    });
};
