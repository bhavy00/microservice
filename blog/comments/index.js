const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
// object to store comments by post's id
const commentsByPostID = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostID[req.params.id] || [])
})

app.post('/posts/:id/comments', (req,res) => {
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    const comments = commentsByPostID[req.params.id] || [];

    comments.push({id: commentId, content})

    commentsByPostID[req.params.id] = comments

    res.status(201).send(commentsByPostID[req.params.id])
})

app.listen(4001, ()=>{
    console.log("listening on 4001");
})