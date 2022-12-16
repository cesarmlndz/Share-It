import './css/App.css';
import MainPage from './pages/main/MainPage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import CreatePost from './pages/create-post/CreatePost';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


export default function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<MainPage />}/>
          <Route path='/createPost' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

