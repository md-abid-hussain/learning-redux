import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCount, increaseCount } from "../features/post/postSlice"

const Header = () => {
    const dispatch = useDispatch()
    const count = useSelector(getCount)

    const handleIncreaseCount = () => {
        dispatch(increaseCount())
    }

    return (
        <header>
            <h1>React Redux Blog</h1>
            <nav>
                <ul>
                    <li key='home'><Link to='/'>Home</Link></li>
                    <li key='post'><Link to='/post'>Post</Link></li>
                    <li key='user'><Link to='/user'>Users</Link></li>
                    <button type='button' onClick={handleIncreaseCount}>{count}</button>
                </ul>
            </nav>

        </header>
    )
}

export default Header