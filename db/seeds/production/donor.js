exports.seed = function(knex, Promise) {
  return knex('donation').del()
  .then(() => {
    return Promise.all([
      knex('donation').insert({
        familyId: 1,
        donationAmount: '$1',
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('donation').insert({
        familyId: 2,
        donationAmount: '$2',
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
