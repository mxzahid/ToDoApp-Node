let bodyParser = require('body-parser')
let mongoose = require('mongoose');
//connect to mongodb
mongoose.connect("mongodb+srv://{username}:dbUser@{appName}.irdp1.mongodb.net/<dbname>?retryWrites=true&w=majority")

//create a blueprint for our data

let todoSchema = new mongoose.Schema({
    item: String
})

let Todo = mongoose.model('Todo', todoSchema)


let urlEncodedParser = bodyParser.urlencoded({extended: false})
module.exports = (app) => {
    app.get('/todo', (req,res) => {
        //gets data from DB and pass it to view
        Todo.find({}, (err,data) =>
        {
            if (err) throw err;
            res.render('todo', {todos: data})
        })
       
    })

    app.post('/todo', urlEncodedParser, (req,res) => {
        let newTodo = Todo(req.body).save((err, data) =>
        {
            if (err) throw err;
            res.json(data)
        })
    })

    app.delete('/todo/:item', (req,res) =>{

        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data) =>
        {
            if (err) throw err;
            res.json(data);
        })
    })
} 
