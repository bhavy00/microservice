const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const posts = {}
// posts['vfd']={'ds': "sdc"}
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req,res) => {
    const {type, data} = req.body;
    if (type==='PostCreated') {
        const {id, title} = data;
        posts[id]={id, title, comments:[]}
        // console.log(data);
        // console.log(posts[id]);
        // console.log(posts);
    }
    if (type==='CommentCreated') {
        // console.log(data);
        const {id, content, postId} = data;
        const post = posts[postId]
        // console.log(post);
        // console.log(id,content,postID);
        post.comments.push({id, content})
    }
});

console.log(posts);
app.listen(4002, ()=>{
    console.log("Listening on PORT 4002");
})