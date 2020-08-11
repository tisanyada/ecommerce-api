const express = require('express');
const app = express();
const multer = require('multer');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');


// dotenv config
require('dotenv').config();


// connection string
const MongoURL = process.env.MongoUrl_DEV;
const PORT = process.env.PORT || 3000;

// multer file config
const { fileFilter, fileStorage } = require('./middlewares/fileConfig');


// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));


// passport config
require('./config/passport')(passport);
app.use(passport.initialize());


// using routes
app.use('/api/users', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));



mongoose.connect(MongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log('\nconnected to database "ecommerceapi"');
            console.log('server is running on port ' + PORT + '\n');
        });
    })
    .catch(err => console.log(err));