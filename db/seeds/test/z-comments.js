exports.seed = function(knex, Promise) {
  return knex('comments').del()
  .then(() => {
    return Promise.all([
      knex('comments').insert({
        body: 'body 1',
        userId: 1,
        familyId: 2,
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('comments').insert({
        body: 'body 2',
        userId: 2,
        familyId: 2,
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
