const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.set('view engine', 'hbs');


app.use((req, res, next) => {

    let now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    if (fs.existsSync(__dirname +'/.maintenance')){
        res.render('maintenance.hbs');
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public_html'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeText: 'Welcome to the jungle'
    });
});

app.get('/about', (req, res) => {
    // res.send('About page!');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to parse request'
    });
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
