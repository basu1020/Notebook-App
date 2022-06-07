// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/note/noteState';
import AuthState from './context/auth/authState';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <NoteState>
        <AuthState>
          <Router>
            <Navbar/>
            <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/signup" element={<SignUp/>}></Route>
            </Routes>
            </div>
          </Router>
        </AuthState>
      </NoteState>
    </>
  );
}

export default App;
