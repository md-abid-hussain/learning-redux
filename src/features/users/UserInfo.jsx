import { useSelector } from 'react-redux'
import { selectUserById } from './userSlice'
import { getPostsByUser } from '../post/postSlice'
import { useParams, Link } from 'react-router-dom'

const UserInfo = () => {
    const { userId } = useParams()
    const user = useSelector((state) => selectUserById(state, Number(userId)))
    const posts = useSelector((state) => getPostsByUser(state, Number(userId)))

    if (!user)
        return (
            <section>
                <h2>User not found</h2>
                <p>User with {userId} does not exist</p>
            </section>
        )

    const renderPostTitles = posts.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>

            <ol>
                {renderPostTitles}
            </ol>
        </section>
    )

}

export default UserInfo