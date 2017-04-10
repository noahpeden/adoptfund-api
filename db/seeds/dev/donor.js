exports.seed = function(knex, Promise) {
  return knex('donation').del()
  .then(() => {
    return Promise.all([
      knex('donation').insert({
        userId: 1,
        familyId: 1,
        donationAmount: '$1',
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('donation').insert({
        userId: 2,
        familyId: 2,
        donationAmount: '$2',
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
