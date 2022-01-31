
const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(expressLayouts);

// to render css file link in header
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log("Server running error", err);
        return;
    }
    console.log(`server running on port ${port}`);
});