exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('firstName');
            table.string('lastName');
            table.string('email');
            table.string('password');

            table.timestamps();
        }),
        knex.schema.createTable('family', function(table){
          table.increments('id').primary();
          table.timestamp('expiration');
          table.string('location');
          table.string('title');
          table.text('story');
          table.string('links');
          table.string('image');
          table.string('expenseDescription')
          table.string('cost')
            table.integer('userId')
                 .references('id')
                 .inTable('users');
        }),
        knex.schema.createTable('donation', function(table){
          table.increments('id').primary();
          table.string('donationAmount')
            table.integer('userId')
                 .references('id')
                 .inTable('users');
            table.integer('familyId')
                 .references('id')
                 .inTable('family');

          table.timestamps();

        }),
        knex.schema.createTable('comments', function(table){
            table.increments('id').primary();
            table.string('body');
            table.integer('userId')
                 .references('id')
                 .inTable('users');
            table.integer('familyId')
                 .references('id')
                 .inTable('family');

            table.timestamps();
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('comments'),
      knex.schema.dropTable('donor'),
      knex.schema.dropTable('family'),
      knex.schema.dropTable('users')
    ])
};
