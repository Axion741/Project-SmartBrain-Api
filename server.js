const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '001',
            name: 'Kyle',
            email: 'kyle@gmail.com',
            password: 'password',
            entries: 0,
            joined: new Date()
        },
        {
            id: '002',
            name: 'Emily',
            email: 'emily@gmail.com',
            password: 'emus',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res)=> {
    res.send(database.users);
})

app.post('/signin', (req ,res)=> {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('Login Success');
    } else {
        res.status(400).json('error logging in');
    }

    res.json("SignIn");
})

app.post('/register', (req, res)=> {
    const {email, name, password} = req.body;
    
    database.users.push({
        id: '003',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=> {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id){
            res.json(user);
            found = true; 
        } 
    })
    if (!found) {
            res.status(404).json('No user found.')
        }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id){
            found = true; 
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(404).json('No user found.')
    }
})

var server = app.listen(3000, () => {
    console.log("Server Online", server.address().port);
})

/*

/ --> res = this is working

/signin --> POST res = success/fail

/register --> POST res = new user

/profile/:userId --> GET res = user

/image --> POST/PUT? res = updated user/scorecount

*/