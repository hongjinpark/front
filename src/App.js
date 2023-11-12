import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Test from "./components/Test";
import Login from "./components/Login";





function App() {

    return (
        <Router>
          <Routes>

              <Route path="login" element={<Login />} />
              <Route path="/" element={<Home />}/>

              <Route path="/test" element={<Test />}/>

         </Routes>
        </Router>
    );
}



export default App;
