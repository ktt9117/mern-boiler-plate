const express = require('express')
const app = express()
const SERVER_PORT = 5100

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mernboilerplate:mernboilerplate1234@movieappcluster.hymu8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch (err => console.log(err))

app.get('/', (req, res) => res.send("Hello express!"))

app.listen(SERVER_PORT, () => console.log(`Server Listening on port ${SERVER_PORT}`))
