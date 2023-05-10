const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
require('dotenv').config();
const weightRoutes = require('./routes/weight');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const sessionSecret = process.env.SESSION_SECRET;
const path = require('path');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    User.authenticate()
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));
console.log('made it to our server file');
// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/weight', weightRoutes);

// All remaining requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start server
app.listen(8080, () => console.log('Server running on http://localhost:8080'));
