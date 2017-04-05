exports.seed = function(knex, Promise) {
  return knex('favorites').del()
  .then(() => {
    return Promise.all([
      knex('favorites').insert({
        rating: 1,
        songKickVenueId: "10",
        userId: 1,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 4,
      }),
      knex('favorites').insert({
        rating: 3,
        songKickVenueId: "12",
        userId: 3,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 4,
      }),
      knex('favorites').insert({
        rating: 5,
        songKickVenueId: "13",
        userId: 5,
      }),
      knex('favorites').insert({
        rating: 1,
        songKickVenueId: "10",
        userId: 6,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "10",
        userId: 8,
      }),
      knex('favorites').insert({
        rating: 3,
        songKickVenueId: "12",
        userId: 7,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 10,
      }),
      knex('favorites').insert({
        rating: 5,
        songKickVenueId: "14",
        userId: 23,
      }),
      knex('favorites').insert({
        rating: 1,
        songKickVenueId: "10",
        userId: 15,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 24,
      }),
      knex('favorites').insert({
        rating: 3,
        songKickVenueId: "19",
        userId: 13,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 30,
      }),
      knex('favorites').insert({
        rating: 5,
        songKickVenueId: "13",
        userId: 8,
      }),
      knex('favorites').insert({
        rating: 1,
        songKickVenueId: "17",
        userId: 9,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 19,
      }),
      knex('favorites').insert({
        rating: 3,
        songKickVenueId: "12",
        userId: 22,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "43",
        userId: 27,
      }),
      knex('favorites').insert({
        rating: 5,
        songKickVenueId: "13",
        userId: 25,
      }),
      knex('favorites').insert({
        rating: 1,
        songKickVenueId: "22",
        userId: 26,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "11",
        userId: 4,
      }),
      knex('favorites').insert({
        rating: 3,
        songKickVenueId: "12",
        userId: 16,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "45",
        userId: 7,
      }),
      knex('favorites').insert({
        rating: 5,
        songKickVenueId: "13",
        userId: 9,
      }),
      knex('favorites').insert({
        rating: 1,
        songKickVenueId: "22",
        userId: 20,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "54",
        userId: 28,
      }),
      knex('favorites').insert({
        rating: 3,
        songKickVenueId: "12",
        userId: 23,
      }),
      knex('favorites').insert({
        rating: 2,
        songKickVenueId: "22",
        userId: 9,
      }),
      knex('favorites').insert({
        rating: 5,
        songKickVenueId: "13",
        userId: 5,
      })
    ]);
  });
};
