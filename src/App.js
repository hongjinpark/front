import './App.module.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Test from './components/Test';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />

          <Route path="/test" element={<Test />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
