exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('cohorts', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('welcome_text', 1000).notNullable();
      table.string('thank_you_text', 1000).notNullable();
      table.datetime('start_date').notNullable();
      table.datetime('end_date').notNullable();
    })
    .createTable('applications', table => {
      table.increments();
      table
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('cascade');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table.boolean('accepted_test').defaultTo(false);
      table.boolean('accepted_cohort').defaultTo(false);
    });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('applications').dropTable('cohorts');
};
