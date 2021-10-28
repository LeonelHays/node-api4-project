require('dotenv').config()
const express = require('express')

const app = express()
const User = require('./model')
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
             message: "The users information could not be retrieved",
            })
        })
})

app.post('/api/users/register', async (req, res) => {
    try{
        const { name, password } = req.body
        if(!name || !password) {
            res.status(400).json({ message: "Please provide name and password for the user" })
        } else {
            const newUser = await User.insert({ name, password })
            req.user = newUser
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(500).json({ massage: 'the server is haunted...' })
    }
})

app.post('/api/users/login', async (req, res) => {
    try{
        const { name, password } = req.body
        if(!password || !name){
           res.status(400).json({ message: "Please provide name and password for the user" })
        }else{
            res.json({ message: `welcome ${name}` })
        }
    }
    catch(err){
        res.status(500).json({ massage: 'the server is haunted...' })
    }
})

app.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
             message: "The user information could not be retrieved",
            })
        })
})

app.get('/', (req, res) => {
    res.send(`<h1>Hello there</h1>
    <p>-Obiwan Kenobi</p>`)
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})