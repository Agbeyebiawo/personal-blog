import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setPosts: (state,action)=>{
            state.posts = action.payload.map(post=>{
                return {
                    id: post._id,
                    title: post.title,
                    summary: post.summary,
                    cover: post.cover,
                    content: post.content,
                    author: post.author,
                    createdAt: new Date(post.createdAt).toDateString()
                }
            })
            // state.posts = action.payload
        },
        deletePost: (state,action)=>{
            const {id} = action.payload
            const postToDelete = state.posts.find(post=>post.id === id)
            if(postToDelete){
                state.posts.splice(state.posts.indexOf(postToDelete),1)
            }
        }
    }
})

export const getAllPosts = (state)=> state.posts.posts
export const getSinglePost = (state,id)=> state.posts.posts.find(post=>post.id === id)
export const {setPosts,deletePost} = postSlice.actions
export default postSlice.reducer