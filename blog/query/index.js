const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()

const posts = {}
// posts['vfd']={'ds': "sdc"}
app.use(bodyParser.json());
app.use(cors());

const handleEvent = (type,data)=>{
    if (type==='PostCreated') {
        const {id, title} = data;
        posts[id]={id, title, comments:[]}
        // console.log(data);
        // console.log(posts[id]);
        // console.log(posts);
    }
    if (type==='CommentCreated') {
        // console.log(data);
        const {id, content, postId, status} = data;
        const post = posts[postId]
        // console.log(post);
        // console.log(id,content,postID);
        post.comments.push({id, content, status})
    }
    if (type === 'CommentUpdated'){
        const {postId, content, status} = data;
        // console.log(data);
        const post = posts[postId]
        const comment = post.comments.find(comment=>{
            return comment.id === id;
        })

        comment.status = status
        comment.content = content 
    }
}
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req,res) => {
    const {type, data} = req.body;

    handleEvent(type, data);
    res.send({});    
});

app.listen(4002, async ()=>{
    console.log("Listening on PORT 4002");
    try {
        const res = await axios.get('http://localhost:4005/events')
        for (let event of res.data) {
            console.log("Processing event:", event.type);
       
            handleEvent(event.type, event.data);
          }
    } catch (error) {
        console.log(error);
    }
})