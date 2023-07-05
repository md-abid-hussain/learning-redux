import { Routes, Route } from 'react-router-dom'
import PostList from "./features/post/PostList"
import SinglePostPage from './features/post/SinglePostPage'
import Layout from './components/Layout'
import AddPost from "./features/post/AddPost"
import EditPostForm from './features/post/EditPostForm'
import UsersList from './features/users/UsersList'
import UserInfo from './features/users/UserInfo'

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>

        <Route index element={<PostList />} />

        <Route path='post'>
          <Route index element={<AddPost />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>

        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UserInfo />} />
        </Route>

      </Route>

    </Routes>
  )
}

export default App
