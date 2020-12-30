const e = require('express');
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


app.post('/api/people', (req, res) => {
    const person = {
        id : people.length + 1,
        name : req.body.name
    }

    people.push(person)
    res.send(person)
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server on port ${port}`);
})
