import {Routes,Route} from 'react-router-dom'
import Layout from "./components/Layout";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import Profile from './pages/Profile';
import PrivateRoute from './pages/PrivateRoute';
import EditPost from './pages/EditPost';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />}/>
          <Route path='/post/:id' element={<ViewPost />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/createpost' element={<CreatePost />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/editpost/:id' element={<EditPost />}/>
          </Route>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
