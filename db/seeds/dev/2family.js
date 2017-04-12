exports.seed = function(knex, Promise) {
  return knex('family').del()
  .then(() => {
    return Promise.all([
      knex('family').insert({
        userId: 1,
        location: 'Denver1',
        expiration: new Date(),
        name: 'name1',
        title: 'title1',
        story: 'story1',
        links: 'link1',
        image: 'image1',
        cost: 'cost1',
      }),
      knex('family').insert({
        userId: 2,
        location: 'Denver2',
        expiration: new Date(),
        name: 'name2',
        title: 'title2',
        story: 'story2',
        links: 'link2',
        image: 'image2',
        cost: 'cost2',
      }),
      knex('family').insert({
        userId: 3,
        location: 'Denver3',
        expiration: new Date(),
        name: 'name3',
        title: 'title3',
        story: 'story3',
        links: 'link3',
        image: 'image3',
        cost: 'cost3',
      }),
      knex('family').insert({
        userId: 4,
        location: 'Denver4',
        expiration: new Date(),
        name: 'name4',
        title: 'title4',
        story: 'story4',
        links: 'link4',
        image: 'image4',
        cost: 'cost4',
      }),
      knex('family').insert({
        userId: 5,
        location: 'Denver5',
        expiration: new Date(),
        name: 'name5',
        title: 'title5',
        story: 'story5',
        links: 'link5',
        image: 'image5',
        cost: 'cost5',
      }),
      knex('family').insert({
        userId: 6,
        location: 'Denver6',
        expiration: new Date(),
        name: 'name6',
        title: 'title6',
        story: 'story6',
        links: 'link6',
        image: 'image6',
        cost: 'cost6',
      }),
    ]);
  });
};
