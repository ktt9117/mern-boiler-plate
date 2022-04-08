const express = require('express')
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch (err => console.log(err))

// Route
app.get('/', (req, res) => res.send("Hello express!"))

app.post('/register', (req, res) => {
  //데이터베이스에 넣어줌
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err});
    return res.status(200).json({ success: true });
  })
})

app.listen(process.env.SERVER_PORT, () => console.log(`Server Listening on port ${process.env.SERVER_PORT}`))
