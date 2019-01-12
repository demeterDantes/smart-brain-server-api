//------------define---------------//
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(database.users)})
//---------Depentensis Injection----------------//
app.post('/signin', signin.handleSignin(db, bcrypt))//an other way

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image',(req, res) =>{ image.handleImage(req, res, db)})

app.post('/imageurl',(req, res) =>{ image.handleApiCall(req, res)})
    

//---------Server Port----------//
app.listen(3000, () =>{
    console.log('app is running, port: 3000');
})

/*
    /-->res = this is working
    /signin --> post = success/fail
    /register --> post = user
    /profile/:userId --> get = user
    /image --> put --> user
*/