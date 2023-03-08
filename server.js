const express = require('express');
const path = require('path');
const multer  = require('multer');
const upload = multer({dest: 'uploads/'});

const app = express(); 

app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const hbs = require('express-handlebars'); 

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: false, name: req.params.name});
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => { 
    res.render('contact');
}); 

app.get('/info', (req, res) => { 
    res.render('info');
}); 

app.get('/history', (req, res) => { 
    res.render('history');
}); 

app.post('/contact/send-message', upload.single('jakisPlik'), (req, res) => {
    const {author, sender, title, message } = req.body; 

    const file = req.file;
    
    if(author && sender && title && message && file) {
        res.render('contact', { isSent: true });
    } 
    else {
        res.render('contact', { isError: true });
    }
}); 

app.use((req, res) => {
    res.status(404).send('404 not found ...');
});

app.listen(7000, () => {
    console.log('Server is running on port: 7000');
});
