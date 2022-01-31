
const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);

app.listen(port, function(err){
    if(err){
        console.log("Server running error", err);
        return;
    }
    console.log(`server running on port ${port}`);
});