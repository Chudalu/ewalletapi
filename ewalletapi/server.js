const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

var knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const search = require('./controllers/search');
const withdraw = require('./controllers/withdraw');
const random = require('./controllers/random');

/*
host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'ewallet'
*/
const db = knex ({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
    }
  });
app.use(express.json());
app.use(cors());

console.log(db.select('*').from('users'));

app.get('/', (req, res) => {
    res.send('it is working!!!')
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/withdraw', (req, res) => {withdraw.handleWithdraw(req, res, db)})

app.post('/search', (req, res) => {search.handleSearch(req, res, db)})

app.put('/random', (req, res) => {random.handleRandomBalance(req, res, db)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port 3000 ${process.env.PORT}`);
})

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});

*/

/*
/ root = responds with - this is working
/signin = POST, responds with success/fail
/register = POST, responds with user object
*/