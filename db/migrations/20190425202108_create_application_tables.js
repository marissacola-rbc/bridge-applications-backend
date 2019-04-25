exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('cohorts', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('welcome_text', 1000).notNullable();
      table.string('thank_you_text', 1000).notNullable();
    })
    .createTable('applications', table => {
      table.increments();
      table
        .integer('cohort_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('cohorts')
        .onDelete('cascade');
      table
        .integer('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table.boolean('accepted_test');
      table.boolean('accepted_cohort');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('applications').dropTable('cohorts');
};
