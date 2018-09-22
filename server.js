const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


// User commen use file to all pages.
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// More about middleware; Keep track how are server working.
app.use((req, res, next) => {
    let now = new Date().toString(); // toString shown human readable text formet.
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        // if (err) throw err;  OR
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// Maintenance middleware
/*app.use((req, res, next) => {
                res.render('maintenance.hbs');
            });
*/
// MIddleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// 1. http get request
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Starting page - Home page.",
        welcomeMessage: "Welcome to my new website"
    });
});
// 2.
app.get('/about', (req, res) => {
    //res.send("About Page.");
    res.render('about.hbs', {
        pageTitle: "About Page123"
    });
});
// 3. 
app.get('/bad', (req, res) => {
    res.send({
        erroMessage: "Unable to handle request!"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});