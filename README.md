## Brief Overview

Build Your Own Backend is a node-express app connecting to a database through knex.  It is the basis for an upcoming music app that will utilize the server built in this project.  The postgres database consists of four main tables: Users, Comments, Favorites, and Access Tokens.  The users table has relationships with all three listed tables.  All endpoints are tested using Mocha Chai.

You can find the production link [here](https://byobackend.herokuapp.com/)

The RESTful endpoints are as follows:

### Users

GET /api/v1/users
* Fetch all users packaged as a JSON object

POST /api/v1/users
* Subscribe as a new using providing an email and password

DELETE /api/v1/users/:id
* Delete a user

PATCH /api/v1/users/:id
* Modify an email address or password via the users' ID

### Comments

GET /api/v1/comments
* Fetch all comments packaged as a JSON object

POST /api/v1/comments
* Post a comment providing a body

POST /api/v1/comments/:userId/:venueId
* Post a comment that is exclusive to a user and a venue ID

DELETE /api/v1/comments/:id
* Delete a comment while providing a user ID

PATCH /api/v1/comments/:id
* Modify a comment providing a user ID

### Favorites

GET /api/v1/favorites
* Fetch all 'favorited' venues

POST /api/v1/favorites
* Post a 'favorited' venue
* Add a 'userId' query parameter to narrow down the 'favorited venue' by user

DELETE /api/v1/favorites/:id
* Delete a 'favorited' venue providing a user ID

PATCH /api/v1/favorites/:id
* Modify a 'favorited' venue providing a user ID

### Access Tokens

GET /api/v1/donation
* Fetch all access tokens


heroku config:set AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy
