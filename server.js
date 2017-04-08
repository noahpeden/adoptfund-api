const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

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
  const {familyId} = req.params

  database('comments').where('familyId', familyId).select()
  .then((comments) => {
    response.status(200).json(comments)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.get('/api/v1/family/:number', (request, response) => {
  const {number} = req.params

  database('family').limit(number).select()
  .then((comments) => {
    response.status(200).json(comments)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.get('/api/v1/family/:familyName', (request, response) => {
  const {familyName} = req.params

  database('family').where('name', familyName).select()
  .then((family) => {
    response.status(200).json(family)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.get('/api/v1/donation/:familyId', (request, response) => {
  const {familyId} = req.params

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
  const { userId } = request.query
  database('family').where('userId', userId).select()
  .then((family) => {
    response.status(200).json(family)
  })
  .catch((error) => {
    response.status(404).json({'Response 404': 'Not Found'})
  })
})

app.post('/api/v1/users', (request, response) => {
  const { email, password } = request.body
  const user = { email, password }

  database('users').insert(user)
  .then(function() {
    database('users').select()
      .then(function(users) {
        response.status(201).json(users)
      })
      .catch(function(error) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      });
  })
})

app.post('/api/v1/comments', (request, response) => {
  const { body, songKickVenueId, userId } = request.body
  const comment = { body, songKickVenueId, userId }
  database('comments').insert(comment)
  .then(function() {
    database('comments').select()
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
    title,
    story,
    links,
    image,
    expenseDescription,
    cost,
    userId
  } = request.body

  const family = {
    expiration,
    location,
    title,
    story,
    links,
    image,
    expenseDescription,
    cost,
    userId
  }
  database('family').insert(family)
  .then(() => {
    database('family').select()
      .then(function(family) {
        response.status(201).json(family)
      })
      .catch(function(error) {
        response.status(422).json({'Response 422': 'Unprocessable Entity'})
      });
  })
})

app.post('/api/v1/donation', (request, response) => {
  const {
    donationAmount,
    userId,
    familyId
  } = request.body

  const donation = {
    donationAmount,
    userId,
    familyId
  }
  database('donation').insert(donation)
  .then(()=> {
    database('donation').select()
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

app.patch('/api/v1/family/:id', (request, response)=> {
  const { id } = request.params
  const {
    expiration,
    location,
    name,
    title,
    story,
    links,
    story,
    links,
    image,
    cost
  } = request.body

  const family = {
    expiration,
    location,
    name,
    title,
    story,
    links,
    story,
    links,
    image,
    cost
  }
  database('family').where('id', id).select()
    .then((favorite)=> {
      database('family').where('id', id).select().update({ family })
      .then(function(family) {
        response.status(201).json({success: 'true'})
      })
      .catch(function(error) {
        response.status(422).json({success: 'false'})
      })
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
