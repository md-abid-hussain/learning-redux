import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { selectPostById, updatePost, deletePost } from "./postSlice";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    if (!post) {
        return (
            <section>
                <h2>No post found</h2>
                <p><Link to="/">Visit home</Link></p>
            </section>
        )
    }

    const handleDeletePost = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap()
        } catch (err) {
            console.log(err)
        } finally {
            navigate('/')
        }
    }

    const onTitleChange = (e) => setTitle(e.target.value)
    const onContentChange = (e) => setContent(e.target.value)
    const onAuthorChange = (e) => setUserId(Number(e.target.value))

    const cansave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onUpdatePostClick = () => {
        if (cansave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const userOption = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    return (
        <section className="edit-post">
            <h2>Edit Post</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="titke">Title:</label>
                <input type="text" id='title' name='title' value={title} onChange={onTitleChange} required placeholder="Post title" />
                <label htmlFor="author">Author:</label>
                <select name="author" id="author" defaultValue={userId} onChange={onAuthorChange}>
                    <option value="" required></option>
                    {userOption}
                </select>
                <label htmlFor="content">Content:</label>
                <textarea type='text' name="content" id="content" value={content} onChange={onContentChange} rows={5} required />
                <button type='button' onClick={onUpdatePostClick} disabled={!cansave}>Update post</button>
                <button type='button' onClick={handleDeletePost} >Delete post</button>
            </form>
        </section>
    )
}

export default EditPostForm