import React from 'react';
import PostCreate from './post-create';
import PostList from './post-list';

export default function App(){
    return (
        <div className='app container'>
            <h1>Create Post</h1>
            <PostCreate/>
            <hr/>
            <PostList/>
        </div>
    )
}