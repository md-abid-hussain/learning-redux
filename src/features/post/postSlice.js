import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import axios from 'axios'
import { sub } from 'date-fns'
const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postAdapter.getInitialState({
    status: 'idle',  // idle, loading, success, fail
    error: null,
    count: 0
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addPost', async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost) => {
    const { id } = updatedPost
    try {
        const response = await axios.put(`${POST_URL}/${id}`, updatedPost)
        return response.data
    } catch (err) {
        // console.log(err)
        return updatedPost // for this only
    }
})

export const deletePost = createAsyncThunk('post/deletePost', async (initialPost) => {
    const { id } = initialPost
    const response = await axios.delete(`${POST_URL}/${id}`)
    if (response.status === 200) {
        console.log(initialPost)
        return initialPost

    }
    return `${response?.status}:${response?.statusText}`
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        increaseCount(state, action) {
            state.count = state.count + 1
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }
                    return post
                });
                postAdapter.upsertMany(state, loadedPosts)

            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                console.log(action.payload)
                postAdapter.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update failed')
                    console.log(action.payload)
                    return
                }
                action.payload.date = new Date().toISOString();
                postAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Failed to delete post')
                    console.log(action.payload)
                    return
                }
                const { id } = action.payload
                postAdapter.removeOne(state, id)
            })
    }
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => state.posts)

export const getPostStatus = (state) => state.posts.status
export const getPostError = (state) => state.posts.error
export const getPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)
export const getCount = (state) => state.posts.count

export const { increaseCount, reactionAdded } = postSlice.actions

export default postSlice.reducer