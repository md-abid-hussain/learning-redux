import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import ReactionSection from "./ReactionSection";
import TimeAgo from "./TimeAgo";
import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, postId))



    if (!post) {
        return (
            <section>
                <h2>No post found</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title.toUpperCase()}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <div className="reactionSection">
                <ReactionSection key={post.id} post={post} />
            </div>
            <Link to={`/post/edit/${postId}`}>Edit Post</Link>
        </article>
    )
}

export default SinglePostPage