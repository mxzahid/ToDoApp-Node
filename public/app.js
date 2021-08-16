let express = require('express')
let bodyParser = require('body-parser')
let todoController = require('./controllers/TodoController')

let app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./'));

//fire controllers
todoController(app);

//listen on port 5000
app.listen(5000);
console.log('Listening on port 5000');

