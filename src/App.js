import { initializeApp } from 'firebase/app';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UsersList from './components/UsersList';
import firebaseConfig from './firebase/config';
import { useUserContext } from './hooks/useUserContext';
import CreateProject from './pages/CreateProject';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Project from './pages/Project';
import Signup from './pages/Signup';

initializeApp(firebaseConfig);

function App() {
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className='container'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={
              <>
                {user ? <Dashboard /> : <Navigate to="/login" />}
              </>
            } />
            <Route exact path='/login' element={
              <>
                {!user ? <Login /> : <Navigate to="/" />}
              </>
            } />
            <Route exact path='/signup' element={
              <>
                {!user ? <Signup /> : <Navigate to="/" />}
              </>
            } />
            <Route path='/profiles/:id' element={
              <>
                {/* View any profile here, but allow updating your own if signed in. */}
                {<Profile />}
              </>
            } />
            <Route path='/projects/:id' element={
              <>
                {/* Don't redirect to login so we can allow readonly viewing of non-private projects. */}
                {<Project />}
              </>
            } />
            <Route path='/create' element={
              <>
                {user ? <CreateProject /> : <Navigate to="/login" />}
              </>
            } />
          </Routes>
        </div>
        {user && <UsersList />}
      </BrowserRouter>
    </div>
  );
}

export default App;