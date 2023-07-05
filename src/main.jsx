import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { fetchUsers } from './features/users/userSlice.js'
import { fetchPosts } from './features/post/postSlice.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
