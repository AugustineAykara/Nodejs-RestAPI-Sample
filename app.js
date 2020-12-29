const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello new user")
});

app.listen(3000, () => {
    console.log("server on port 3000");
})
