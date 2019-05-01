const faker = require('faker');
const { createSeedData } = require('../seed-data.helpers');

exports.seed = knex => {
  let users;
  let roles;

  return knex('user_roles')
    .del()
    .then(() => knex.select('id').from('users'))
    .then(rows => {
      users = rows;
      return knex.select('id').from('roles');
    })
    .then(rows => {
      roles = rows;
      return knex('user_roles').insert(
        createSeedData(20, i => {
          return {
            user_id: faker.helpers.randomize(users).id,
            role_id: faker.helpers.randomize(roles).id,
          };
        }),
      );
    });
};
