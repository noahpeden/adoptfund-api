exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(() => {
    return Promise.all([
      knex('users').insert({
        firstName: 'kelly',
        lastName: 'kapowski',
        email: "kellykapowski@gmail.com",
        password: "bleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        firstName: 'ac',
        lastName: 'slater',
        email: "acslater@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        firstName: '3',
        lastName: '3',
        email: "3@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        firstName: '4',
        lastName: '4',
        email: "4@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        firstName: '5',
        lastName: '5',
        email: "5@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        firstName: '6',
        lastName: '6',
        email: "6@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
