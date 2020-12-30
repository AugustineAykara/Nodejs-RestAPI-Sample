const joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const people = [
    {
        id: 1,
        name: "Abey"
    },
    {
        id: 2,
        name: "Abin"
    },
    {
        id: 3,
        name: "Akhil"
    },
]


// GET Request
app.get('/', (req, res) => {
    res.send("Hello new user...")
});

app.get('/api/people', (req, res) => {
    res.send(people)
});

app.get('/api/people/:id', (req, res) => {
    const person = people.find(c => c.id === parseInt(req.params.id))
    if(!person) res.status(404).send("Person with given id not found")
    res.send(person)
});


// POST Request
app.post('/api/people', (req, res) => {
    
    // let name = req.body.name
    // if(!name || name.length < 3) {
    //     res.status(400).send("Invalid input (req min 3 char)")
    //     return
    // }
    
    // Input Validation using joi package
    const schema = joi.object({       
        name : joi.string().min(3).required()
    });
    const person = schema.validate(req.body)
    if(person.error){
        res.send(person.error.details[0].message)
        return
    }
    people.push(person)
    res.send(people)
});


// PUT Request
app.put('/api/people/:id', (req, res) => {
    
    // to check if person exist
    person = people.find(c => c.id === parseInt(req.params.id))
    if(!person) res.status(404).send("Person with given id not found")
    
    // input validation
    const schema = joi.object({
        name : joi.string().min(3).required()
    });
    
    person = schema.validate(req.body)
    console.log(person);
    if(person.error){
        res.send(person.error.details[0].message)
        return
    }
    
    // to update properties
    person.name = req.body.name
    res.send(people)
});



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server on port ${port}`);
})
