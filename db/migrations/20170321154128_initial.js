exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('email');
            table.string('password');

            table.timestamps();
        }),

        knex.schema.createTable('comments', function(table){
            table.increments('id').primary();
            table.string('body');
            table.string('songKickVenueId')
            table.integer('userId')
                 .references('id')
                 .inTable('users');

            table.timestamps();
        }),

        knex.schema.createTable('favorites', function(table){
          table.increments('id').primary();
          table.string('songKickVenueId');
          table.integer('rating');
            table.integer('userId')
                 .references('id')
                 .inTable('users');
        }),
        knex.schema.createTable('accessTokens', function(table){
          table.increments('id').primary();
          table.string('refreshToken');
          table.string('accessToken');
          table.timestamp('expiration');
            table.integer('userId')
                 .references('id')
                 .inTable('users');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('accessTokens'),
      knex.schema.dropTable('favorites'),
      knex.schema.dropTable('comments'),
      knex.schema.dropTable('users')
    ])
};
