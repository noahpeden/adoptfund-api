exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(() => {
    return Promise.all([
      knex('users').insert({
        email: "kellykapowski@gmail.com",
        password: "bleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "acslater@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "jessiespano@gmail.com",
        password: "blap",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "mrbelding@gmail.com",
        password: "blurp",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "screech@gmail.com",
        password: "schmeep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "zackmorris@gmail.com",
        password: "pleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "michelletanner@gmail.com",
        password: "bleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "unclejesse@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "unclejoey@gmail.com",
        password: "blap",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "stephanietanner@gmail.com",
        password: "blurp",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "djtanner@gmail.com",
        password: "schmeep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "zackmorris@gmail.com",
        password: "pleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "becky@gmail.com",
        password: "bleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "dannytanner@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "kimmygibler@gmail.com",
        password: "blap",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "carltonbanks@gmail.com",
        password: "blurp",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "ashleybanks@gmail.com",
        password: "schmeep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "philipbanks@gmail.com",
        password: "pleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "hillarybanksi@gmail.com",
        password: "bleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "butlerjeffrey@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "jazz@gmail.com",
        password: "blap",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "cliffhuxtable@gmail.com",
        password: "blurp",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "vanessahuxtable@gmail.com",
        password: "schmeep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "clairhuxtable@gmail.com",
        password: "pleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "rudyhuxtable@gmail.com",
        password: "bleep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "theohuxtable@gmail.com",
        password: "bloop",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "elvintibideaux@gmail.com",
        password: "blap",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "kenny@gmail.com",
        password: "blurp",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "charmainebrown@gmail.com",
        password: "schmeep",
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('users').insert({
        email: "cockroach@gmail.com",
        password: "pleep",
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
