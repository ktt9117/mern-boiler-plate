const express = require('express')
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const mongoose = require('mongoose');

const app = express();
const config = require('./config/key');

// Middleware

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

// Database 
mongoose.connect(config.MONGO_URI, {
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

app.listen(config.SERVER_PORT, () => console.log(`Server Listening on port ${config.SERVER_PORT}`))
