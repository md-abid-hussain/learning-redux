import PostAuthor from "./PostAuthor";
import ReactionSection from "./ReactionSection";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";

let PostExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 75)}....</p>


            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <div className="reactionSection">
                <ReactionSection key={post.id} post={post} />

            </div>
            <Link to={`post/${post.id}`}>View post</Link>
        </article>
    )
}

PostExcerpt = React.memo(PostExcerpt)

export default PostExcerpt