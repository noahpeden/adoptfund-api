exports.seed = function(knex, Promise) {
  return knex('accessTokens').del()
  .then(() => {
    return Promise.all([
      knex('accessTokens').insert({
        refreshToken: "aaa",
        expiration: new Date,
        userId: 1,
      }),
      knex('accessTokens').insert({
        refreshToken: "bbb",
        expiration: new Date,
        userId: 2,
      }),
      knex('accessTokens').insert({
        refreshToken: "ccc",
        expiration: new Date,
        userId: 3,
      }),
      knex('accessTokens').insert({
        refreshToken: "ddd",
        expiration: new Date,
        userId: 4,
      }),
      knex('accessTokens').insert({
        refreshToken: "eee",
        expiration: new Date,
        userId: 5,
      }),
      knex('accessTokens').insert({
        refreshToken: "fff",
        expiration: new Date,
        userId: 6,
      }),
      knex('accessTokens').insert({
        refreshToken: "ggg",
        expiration: new Date,
        userId: 7,
      }),
      knex('accessTokens').insert({
        refreshToken: "hhh",
        expiration: new Date,
        userId: 8,
      }),
      knex('accessTokens').insert({
        refreshToken: "iii",
        expiration: new Date,
        userId: 9,
      }),
      knex('accessTokens').insert({
        refreshToken: "jjj",
        expiration: new Date,
        userId: 10,
      }),
      knex('accessTokens').insert({
        refreshToken: "kkk",
        expiration: new Date,
        userId: 11,
      }),
      knex('accessTokens').insert({
        refreshToken: "lll",
        expiration: new Date,
        userId: 12,
      }),
      knex('accessTokens').insert({
        refreshToken: "mmm",
        expiration: new Date,
        userId: 13,
      }),
      knex('accessTokens').insert({
        refreshToken: "nnn",
        expiration: new Date,
        userId: 14,
      }),
      knex('accessTokens').insert({
        refreshToken: "ooo",
        expiration: new Date,
        userId: 15,
      }),
      knex('accessTokens').insert({
        refreshToken: "ppp",
        expiration: new Date,
        userId: 16,
      }),
      knex('accessTokens').insert({
        refreshToken: "qqq",
        expiration: new Date,
        userId: 17,
      }),
      knex('accessTokens').insert({
        refreshToken: "rrr",
        expiration: new Date,
        userId: 18,
      }),
      knex('accessTokens').insert({
        refreshToken: "sss",
        expiration: new Date,
        userId: 19,
      }),
      knex('accessTokens').insert({
        refreshToken: "ttt",
        expiration: new Date,
        userId: 20,
      }),
      knex('accessTokens').insert({
        refreshToken: "uuu",
        expiration: new Date,
        userId: 21,
      }),
      knex('accessTokens').insert({
        refreshToken: "vvv",
        expiration: new Date,
        userId: 22,
      }),
      knex('accessTokens').insert({
        refreshToken: "www",
        expiration: new Date,
        userId: 23,
      }),
      knex('accessTokens').insert({
        refreshToken: "xxx",
        expiration: new Date,
        userId: 24,
      }),
      knex('accessTokens').insert({
        refreshToken: "yyy",
        expiration: new Date,
        userId: 25,
      }),
      knex('accessTokens').insert({
        refreshToken: "zzz",
        expiration: new Date,
        userId: 26,
      }),
      knex('accessTokens').insert({
        refreshToken: "111",
        expiration: new Date,
        userId: 27,
      }),
      knex('accessTokens').insert({
        refreshToken: "222",
        expiration: new Date,
        userId: 28,
      }),
      knex('accessTokens').insert({
        refreshToken: "333",
        expiration: new Date,
        userId: 29,
      }),
      knex('accessTokens').insert({
        refreshToken: "444",
        expiration: new Date,
        userId: 30,
      })
    ]);
  });
};
