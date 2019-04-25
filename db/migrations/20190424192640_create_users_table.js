// set things up
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('users', table => {
      table.increments(); // creates the id as the primary key with the name id (always do this first)
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table
        .string('email')
        .notNullable()
        .unique();
      table.string('pronouns').notNullable();
      table
        .enu('employment_status', [
          'full_time',
          'part_time',
          'in_school',
          'looking',
          'not_looking',
        ])
        .notNullable();
      table.string('employer');
    })
    .createTable('identifying_info', table => {
      table.increments();
      table.string('name');
      table.boolean('is_gender_related');
      table.boolean('user_generated');
    })
    .createTable('users_identifying_info', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .integer('identifying_info_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('identifying_info')
        .onDelete('cascade');
    });
};

// roll back strategy
exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('users_identifying_info')
    .dropTable('users')
    .dropTable('identifying_info');
};
