const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRouters = require('./routes/blogRoutes');

const app = express();

// Create your own db use mongodb.
const dbURI = 'mongodb+srv://simplenote:simple555@simple-note.4obnt.mongodb.net/simple-note?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err));

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRouters);

//eror 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Error404' });
});

// Feel free to edit or Develop your idea
// Reference : The Net Ninja Course.