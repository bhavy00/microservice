import React, {useState} from 'react'
import axios from 'axios'

export default function PostCreate(){
    const [title, setTitle] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault()
        
        await axios.post('http://localhost:4000/posts', {
            title
        })

        setTitle('')
    }
    return (
        <div className='post-create'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input className='form-control' value={title} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <br/>
                <button className='btn btn-primary'>submit</button>
            </form>
        </div>
    )
}