exports.seed = function(knex, Promise) {
  return knex('donor').del()
  .then(() => {
    return Promise.all([
      knex('donor').insert({
        userId: 1,
        familyId: 1,
        donationAmount: '$1',
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('donor').insert({
        userId: 2,
        familyId: 2,
        donationAmount: '$2',
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
