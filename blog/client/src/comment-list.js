import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function CommentList({comments}){

    // the commented code below was used for the time when query services wasn't created
    // const [comments, setComments] = useState([])

    // const fetchComments = async ()=>{
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    // useEffect(()=>{
    //     fetchComments()
    // },[])

    const renderedComments = comments.map(comment=>{
        return <li key={comment.id}>{comment.content}</li>
    })
    return (
        <div>
            <ul>{renderedComments}</ul>
        </div>
    )
}