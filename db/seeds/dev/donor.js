exports.seed = function(knex, Promise) {
  return knex('donation').del()
  .then(() => {
    return Promise.all([
      knex('donation').insert({
        familyId: 1,
        donationAmount: 1000,
        firstName: 'Josh',
        lastName: 'Small',
        email: 'j@j.com',
        created_at: new Date,
        updated_at: new Date,
      }),
      knex('donation').insert({
        familyId: 2,
        donationAmount: 2000,
        firstName: 'Noah',
        lastName: 'Peden',
        email: 'n@n.com',
        created_at: new Date,
        updated_at: new Date,
      })
    ]);
  });
};
