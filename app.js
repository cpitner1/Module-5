const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { response } = require('express');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://cpitner:test1234@cluster0.hatj5cr.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    response.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
})

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});