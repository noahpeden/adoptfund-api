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
      })
    ]);
  });
};
