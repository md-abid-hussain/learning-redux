import { reactionAdded } from "./postSlice";
import { useDispatch } from "react-redux";

const reactionObj = {
    thumbsUp: '👍',
    hooray: '🙌',
    heart: '♥',
    rocket: '🚀',
    eyes: '👀'
}

const ReactionSection = ({ post }) => {
    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactionObj).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type='button'
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }>
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div>{reactionButtons}</div>
    )
}

export default ReactionSection