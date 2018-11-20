const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Infinity011093',
      database : 'smartbrain'
    }
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.get('/', (req,res)=> {res.send(database.users);})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

var server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server Online", server.address().port);
})

/*

/ --> res = this is working

/signin --> POST res = success/fail

/register --> POST res = new user

/profile/:userId --> GET res = user

/image --> POST/PUT? res = updated user/scorecount

*/