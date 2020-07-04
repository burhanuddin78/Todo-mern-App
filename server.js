const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const path = require('path');

//  Connect db
connectDB();

app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect Database
connectDB();

// init Middleware
app.use(express.json({ extended: false }));

// Api for resgistration
app.use('/api/user/register', require('./routes/api/user'));
// Apis for get update delete
app.use('/api/todo', require('./routes/api/post'));
// Api for Signin
app.use('/api/signin', require('./routes/api/signin'));

// Server  static assests in production
if (process.env.NODE_ENV == 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
