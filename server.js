const express = require('express')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('connect-flash')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const aws = require('aws-sdk');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({secret: '{secret}', name: 'session_id', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET, POST, PATCH ,DELETE');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', process.env.PORT || 3000)

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(username, password, done) {
    database('users').where('email', username).select()
    .then(user => {
      if(!comparePass(password, user[0].password)){
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
    .catch(err => {
      console.log(err)
      return done(null, false, { message: 'Not Found' })
    })
  }
));

app.post('/api/v1/register', (request, response) => {
  const { email, password, firstName, lastName } = request.body
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  database('users').where('email', email).select()
  .then(user => {
    if(user.length > 0){
      response.status(422).json({'message': 'Already Exists'})
    }else{
      database('users').insert({
        email,
        firstName,
        lastName,
        password: hash,
      })
      .returning('*')
      .then(user => {
        response.status(200).json(user)
      })
      .catch(err => {
        response.status(404).json(err)
      })
    }
  })
  .catch(err => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.post('/api/v1/login', (request, response) => {
  const {email, password} = request.body

  database('users').where('email', email).select()
  .then(user => {
    if(!comparePass(password, user[0].password)){
      response.status(404).json({ message: 'Incorrect password.' })
    }
    response.status(200).json(user)
  })
  .catch(err => {
    response.status(404).json({ message: 'Email Not Found.' })
  })
})

app.get('/api/v1/users', (request, response) => {
  database('users').select()
  .then((users) => {
    response.status(200).json(users)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.get('/api/v1/comments/:familyId', (request, response) => {
  const {familyId} = request.params

  database('comments').where('familyId', familyId).select()
  .then((comments) => {
    response.status(200).json(comments)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

// this gets the NUMBER of families requested back
app.get('/api/v1/family/all', (request, response) => {
  database('family').select()
  .then((comments) => {
    response.status(200).json(comments)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})


app.get('/api/v1/family/:familyName', (request, response) => {
  const {familyName} = request.params

  database('family').where('name', familyName).select()
  .then((family) => {
    response.status(200).json(family)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.get('/api/v1/donation/:familyId', (request, response) => {
  const {familyId} = request.params

  database('donation').where('familyId', familyId).select()
  .then((donations) => {
    response.status(200).json(donations)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

//QUERY PARAM ?userId=5
app.get('/api/v1/family', (request, response) => {
  const { limit } = request.query
  database('family').limit(limit).select()
  .then((family) => {
    response.status(200).json(family)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.post('/api/v1/comments', (request, response) => {
  const { body, familyId, userId } = request.body
  const comment = { body, familyId, userId }
  database('comments').insert(comment)
  .then(function() {
    database('comments').where('familyId', familyId).select()
      .then(function(comments) {
        response.status(201).json(comments)
      })
      .catch(function(error) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      });
  })
})

app.post('/api/v1/family', (request, response) => {
  const {
    expiration,
    location,
    name,
    title,
    story,
    links,
    image,
    cost,
    userId
  } = request.body

  const family = {
    expiration,
    location,
    name,
    title,
    story,
    links,
    image,
    cost,
    userId
  }
  database('family').insert(family)
  .returning('id')
  .then((id) => {
    const firstId = id[0]
    database('family').where('id', firstId).select()
      .then(function(family) {
        response.status(201).json(family)
      })
      .catch(function(error) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      });
  })
})

app.post('/api/v1/family/pic/', (request, response) => {
  let s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

  const fileName = request.query['file-name']
  const fileType = request.query['file-type']
  const s3Params = {
    Bucket: 'adoptfund1',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  }
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return response.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://adoptfund1.s3.amazonaws.com/${fileName}`
    };
    response.write(JSON.stringify(returnData));
    response.end();
  });
})

app.post('/api/v1/donation', (request, response) => {
  const {
    donationAmount,
    firstName,
    lastName,
    email,
    familyId
  } = request.body

  const donation = {
    donationAmount,
    firstName,
    lastName,
    email,
    familyId
  }
  database('donation').insert(donation)
  .then(()=> {
    database('donation').where('familyId', familyId).select()
    .then(function(donations) {
      response.status(201).json(donations)
    })
    .catch(function(error) {
      response.status(422).json({'Response 422': 'Unprocessable Entity'})
    });
  })
})

app.delete('/api/v1/users/:id', (request, response)=> {
  const { id } = request.params
    database('users').where('id', id).select().del()
    .then(function(count) {
      if (count === 0) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      } else {
        response.status(200).json({'Response 200': 'OK' })
      }
    })
})
app.delete('/api/v1/donation/:id', (request, response)=> {
  const { id } = request.params
    database('donation').where('id', id).select().del()
    .then(function(count) {
      if (count === 0) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      } else {
        response.status(200).json({'Response 200': 'OK' })
      }
    })
})

app.delete('/api/v1/comments/:id', (request, response)=> {
  const { id } = request.params
    database('comments').where('id', id).select().del()
    .then(function(count) {
      if (count === 0) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      } else {
        response.status(200).json({'Response 200': 'OK' })
      }
    })
})

app.delete('/api/v1/family/:id', (request, response)=> {
  const { id } = request.params
    database('family').where('id', id).select().del()
    .then(function(count) {
      if (count === 0) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      } else {
        response.status(200).json({'Response 200': 'OK' })
      }
    })
})

app.patch('/api/v1/users/:id', (request, response)=> {
  const { id } = request.params
  const { email } = request.body
  database('users').where('id', id).select()
    .then((user)=> {
      database('users').where('id', id).select().update({ email })
      .then(function(users) {
        response.status(201).json({success: 'true'})
      })
      .catch(function(error) {
        response.status(422).json({success: 'false'})
      })
  })
})

app.patch('/api/v1/comments/:id', (request, response)=> {
  const { id } = request.params
  const { body } = request.body
  database('comments').where('id', id).select()
    .then((comment)=> {
      database('comments').where('id', id).select().update({ body })
      .then(function(comments) {
        response.status(201).json({success: 'true'})
      })
      .catch(function(error) {
        response.status(422).json({success: 'false'})
      })
  })
})
app.patch('/api/v1/donation/:id', (request, response)=> {
  const { id } = request.params
  const { donationAmount } = request.body
  database('donation').where('id', id).select()
    .then((donation)=> {
      database('donation').where('id', id).select().update({ donationAmount })
      .then(function(donation) {
        response.status(201).json(donation)
      })
      .catch(function(error) {
        response.status(422).json({success: 'false'})
      })
  })
})

app.patch('/api/v1/family/:id', (request, response)=> {
  const { id } = request.params
  const {
    expiration,
    amountFunded,
    location,
    name,
    title,
    links,
    story,
    image,
    cost
  } = request.body
    database('family').where('id', id).select().update({ expiration, amountFunded, location, name, title, links, story, image, cost })
    .then((familyId) => {
      database('family').where('id', id).select()
      .then((family) => {
        response.status(200).json(family)
      })
    })
    .catch(function(error) {
      console.log(error);
    })
  })



app.listen(app.get('port'), () => {
  console.log(`This thing is running on ${app.get('port')}.`)
})

module.exports = app;
