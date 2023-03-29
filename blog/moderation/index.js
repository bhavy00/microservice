const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req,res)=>{
    const {type, data} = req.body;
    // console.log(data);
    if (type==='CommentCreated') {
        const status = data.content.includes('orange')?'rejected':'approved';
        // console.log(status);
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModeration',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((err)=>{console.log(err);})
    }
})

app.listen(4003, ()=>{
    console.log("Listening on PORT 4003");
})