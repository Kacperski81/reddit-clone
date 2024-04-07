import { Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './layouts/Layout';
import { useAuthUser } from './lib/firebase';

function App() {
  useAuthUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
