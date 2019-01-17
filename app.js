//use express
let express = require('express');
//define express app 
let app = express();
//import bodyparser middleware
let bodyParser = require('body-parser');

//use mogan logging
app.use('morgan'('common'));

//when the app loads return the html doc
app.get('/', (req, res) => {
    app.sendFile(__dirname, 'views/index.html');
});


//listen to port....
app.listen(3000, ()=> {console.log("listening to Port 3000");});


