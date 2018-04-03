
const express = require('express'),
      hbs     = require('hbs'),
      fs      = require('fs');


var app = express();

app.set('viewe engine', 'hbs');

app.use((req, res, next) => {
    var log = `${new Date().toString()}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Main page',
        welcomeMsg: 'Welcome on board, buddy!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About page'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

