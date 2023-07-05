import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";

import { useState } from 'react'

const AddPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const handleSubmit = (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error(err)
            } finally {
                setAddRequestStatus('idle')
                navigate('/')
            }
        }
    }

    const onAuthorChange = (e) => {
        setUserId(e.target.value)
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))



    return (
        <section className="addpost">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Post Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        minLength={10}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <select id='author' value={userId} onChange={onAuthorChange}>
                        <option value="">--Please select an author--</option>
                        {userOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor="content">Post Content:</label>
                    <textarea
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        minLength={20}
                        rows={5}
                        required
                    ></textarea>
                </div>
                <button disabled={!canSave}>Submit Post</button>
            </form>
        </section>
    )
}

export default AddPost