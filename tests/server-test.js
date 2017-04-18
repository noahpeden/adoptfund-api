process.env.NODE_ENV = 'test';


const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert
const chaiHttp = require('chai-http');
const server = require('../server.js');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);
// const knex = require('knex')(configuration)


chai.use(chaiHttp);

describe('Server', () => {
  beforeEach(function(done) {
  database.migrate.rollback()
  .then(function() {
    database.migrate.latest()
    .then(function() {
      return database.seed.run()
      .then(function() {
        done();
      });
    });
  });
});
it('should exist', () => {
    expect(server).to.exist;
  });
  describe('GET /', () => {
    it('should send back an html file', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
    });
  });

 //SAD PATH
describe('GET /', () => {
  it('should respond back with a 404 error', (done) => {
    chai.request(server)
    .get('/ /')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('GET /api/v1/users', () => {
  it('should respond back with all users', (done) => {
    chai.request(server)
    .get('/api/v1/users')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(6);
      done();
    });
  });
});

 //SAD PATH
describe('GET /api/v1/users', () => {
  it('should respond back with a 404 error', (done) => {
    chai.request(server)
    .get('/api/v1/userss')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('GET /api/v1/comments/:familyId', () => {
  it('should respond back with all comments', (done) => {
    chai.request(server)
    .get('/api/v1/comments/2')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(2);
      done();
    });
  });
});

//SAD PATH
describe('GET /api/v1/comments', () => {
  it('should respond back with a 404 error', (done) => {
    chai.request(server)
    .get('/api/v1/commentss')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('GET /api/v1/family/all', () => {``
  it('should respond back with all family', (done) => {
    chai.request(server)
    .get('/api/v1/family')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(6);
      done();
    });
  });
});

//SAD PATH
describe('GET /api/v1/family/all', () => {
  it('should respond back with a 404 error', (done) => {
    chai.request(server)
    .get('/api/v1/famly/all')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

// COME BACK TO THIS ONE
// describe('GET /api/v1/donation/:familyId', () => {
//   it.only('should respond back with all donation', (done) => {
//     chai.request(server)
//     .get('https://adoptfund-api.herokuapp.com/api/v1/donation/1')
//     .end((err, res) => {
//       if(err) {done(err) }
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('array');
//       expect(res.body).to.have.length(0);
//       done();
//     });
//   });
// });
//
//  //SAD PATH
// describe('GET /api/v1/donation', () => {
//   it('should respond back with a 404 error', (done) => {
//     chai.request(server)
//     .get('/api/v1/donations')
//     .end((err, res) => {
//       expect(res).to.have.status(404);
//       done();
//     });
//   });
// });

describe('POST /api/v1/register', function() {
    it('should create a new user', function(done) {
      let user = {
        email:'mikeziccardi@ishandsome.com',
        password:'thepasswordistaco',
        firstName:'Mike',
        lastName:'IsHandsome'
      }
      chai.request(server)
      .post('/api/v1/register')
      .send(user)
      .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      done();
    });
  });
});
//
//  //SAD PATH
// describe('POST /api/v1/users', function() {
//      it('should respond with a 404', function(done) {
//        let user = {userName:'user fun'}
//        chai.request(server)
//        .post('/api/v1/userss')
//        .send(user)
//        .end((err, res) => {
//        expect(res).to.have.status(404);
//        expect(res.body).to.be.a('object');
//        done();
//      });
//   });
// });
//
//
// describe('POST /api/v1/comments', function() {
//       it('should create a new comment', function(done) {
//         let comment = {commentName:'comment fun'}
//         chai.request(server)
//         .post('/api/v1/comments')
//         .send(comment)
//         .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         done();
//       });
//    });
// });
//
// //SAD PATH
//  describe('POST /api/v1/comments', function() {
//      it('should respond with a 404', function(done) {
//        let user = {userName:'user fun'}
//        chai.request(server)
//        .post('/api/v1/commentss')
//        .send(user)
//        .end((err, res) => {
//        expect(res).to.have.status(404);
//        expect(res.body).to.be.a('object');
//        done();
//      });
//    });
//  });
//
// describe('POST /api/v1/favorites', function() {
//     it('should create a new favorite', function(done) {
//       let favorite = {favoriteName:'favorite fun'}
//       chai.request(server)
//       .post('/api/v1/favorites')
//       .send(favorite)
//       .end((err, res) => {
//       expect(res).to.have.status(201);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('array');
//       done();
//     });
//   });
// });
//
// //SAD PATH
// describe('POST /api/v1/favorites', function() {
//     it('should respond with a 404', function(done) {
//       let user = {userName:'user fun'}
//       chai.request(server)
//       .post('/api/v1/favoritess')
//       .send(user)
//       .end((err, res) => {
//       expect(res).to.have.status(404);
//       expect(res.body).to.be.a('object');
//       done();
//     });
//   });
// });
//
// describe('POST /api/v1/comments/:userId/:venueId', function() {
//     it('should create a new favorite', function(done) {
//       let favorite = {favoriteName:'favorite fun'}
//       chai.request(server)
//       .post('/api/v1/favorites')
//       .send(favorite)
//       .end((err, res) => {
//       expect(res).to.have.status(201);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('array');
//       done();
//     });
//   });
// });
//
// //SAD PATH
// describe('POST /api/v1/comments/:userId/:venueId', function() {
//     it('should respond with a 404', function(done) {
//       let user = {userName:'user fun'}
//       chai.request(server)
//       .post('/api/v1/favoritess')
//       .send(user)
//       .end((err, res) => {
//       expect(res).to.have.status(404);
//       expect(res.body).to.be.a('object');
//       done();
//     });
//   });
// });
//
// //SAD PATH
//  describe('POST /api/v1/donation', function() {
//      it('should respond with a 404', function(done) {
//        let token = {token:'token fun'}
//        chai.request(server)
//        .post('/api/v1/donations')
//        .send(token)
//        .end((err, res) => {
//        expect(res).to.have.status(404);
//        expect(res.body).to.be.a('object');
//        done();
//      });
//    });
//  });
//
// describe('DELETE /api/v1/users/:id', ()=> {
// beforeEach(function(done){
//   database('users').insert({
//           email: 'shakira@gmail.com',
//           password: 'bloop',
//         }).then(function(){
//           done()
//         })
// })
// it('should delete a user', (done)=> {
//     chai.request(server)
//     .delete('/api/v1/users/1')
//     .end((error, res)=> {
//       expect(res).to.have.status(422)
//       expect(res).to.be.json
//       expect(res.body).to.be.a('object')
//       done()
//     })
//   })
// })
//
// //SAD PATH
// describe('DELETE /api/v1/users/:id', function() {
//   it('should return a 422 if user is not found', function(done) {
//     chai.request(server)
//     .delete('/api/v1/users/1')
//     .end(function(err, res) {
//       expect(res).to.have.status(422);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('object');
//       done();
//       });
//     });
// });
//
// describe('DELETE /api/v1/comments/:id', ()=> {
// beforeEach(function(done){
//   database('comments').insert({
//           body: 'blahblahblah',
//         }).then(function(){
//           done()
//         })
// })
// it('should delete a comment', (done)=> {
//     chai.request(server)
//     .delete('/api/v1/comments/1')
//     .end((error, res)=> {
//       expect(res).to.have.status(422)
//       expect(res).to.be.json
//       expect(res.body).to.be.a('object')
//       done()
//     })
//   })
// })
//
// //SAD PATH
// describe('DELETE /api/v1/comments/:id', function() {
//   it('should return a 422 if comment is not found', function(done) {
//     chai.request(server)
//     .delete('/api/v1/comments/1')
//     .end(function(err, res) {
//       expect(res).to.have.status(422);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('object');
//       done();
//       });
//     });
// });
//
// //SAD PATH
// describe('DELETE /api/v1/favorites/:id', function() {
//   it('should return a 422 if favorite is not found', function(done) {
//     chai.request(server)
//     .delete('/api/v1/favorites/1')
//     .end(function(err, res) {
//       expect(res).to.have.status(422);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('object');
//       done();
//       });
//     });
// });
//
//   describe('PATCH /api/v1/users/:id', ()=> {
//     it('should edit a users email', (done)=> {
//       chai.request(server)
//       .patch('/api/users/1')
//       .send({
//         email: 'smello@gmail.com'
//       })
//       .end((error, res)=> {
//         expect(res).to.have.status(404)
//         expect(res.body).to.be.a('object')
//         done()
//       })
//     })
//
// //SAD PATH
// describe('PATCH /api/v1/users/:id', ()=> {
//     it('should return 404 if incorrect path is entered', (done)=> {
//       chai.request(server)
//       .post('/api/v1/users/1')
//       .end((error, res)=> {
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//   })
// })
//
// describe('PATCH /api/v1/comments/:id', ()=> {
// it('should edit a comments body', (done)=> {
//   chai.request(server)
//   .patch('/api/v1/comments/1')
//   .send({
//     body: 'yoyoyoyoyoyo'
//   })
//   .end((error, res)=> {
//     expect(res).to.have.status(201)
//     expect(res).to.be.json
//     expect(res.body).to.be.a('object')
//     done()
//   })
// })
//
// //SAD PATH
// describe('PATCH /api/v1/comments/:id', ()=> {
//     it('should return 404 if incorrect path is entered', (done)=> {
//       chai.request(server)
//       .post('/api/v1/comments/1')
//       .end((error, res)=> {
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//   })
//
//
// describe('PATCH /api/favorites/:id', ()=> {
//   it('should edit a favorites body', (done)=> {
//     chai.request(server)
//     .patch('/api/v1/favorites')
//     .send({
//       rating: '5'
//     })
//     .end((error, res)=> {
//       expect(res).to.have.status(404)
//       expect(res.body).to.be.a('object')
//       done()
//     })
//   })
// })
//
//
// //SAD PATH
// describe('PATCH /api/v1/favorites/:id', ()=> {
//     it('should return 404 if incorrect path is entered', (done)=> {
//       chai.request(server)
//       .post('/api/v1/favorites/1')
//       .end((error, res)=> {
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//   })
// })
})
