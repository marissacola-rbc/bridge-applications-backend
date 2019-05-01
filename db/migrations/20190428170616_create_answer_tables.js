exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('questions', table => {
      table.increments();
      table.string('question_text', 1000).notNullable();
      table.enu('question_type', ['checkbox', 'radio', 'text']).notNullable();
    })
    .createTable('answers', table => {
      table.increments();
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('questions')
        .onDelete('cascade');
      table.string('answer_text', 1000).notNullable();
    })
    .createTable('user_answers', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .integer('answer_id')
        .unsigned()
        .references('id')
        .inTable('answers')
        .onDelete('cascade');
      table
        .integer('application_id')
        .unsigned()
        .references('id')
        .inTable('applications')
        .onDelete('cascade');
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('questions')
        .onDelete('cascade');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('user_answers')
    .dropTable('answers')
    .dropTable('questions');
};
