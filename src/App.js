import './App.module.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Test from './components/Test';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LinkPage from './pages/LinkPage';
import Admin from './pages/Admin';
import Lounge from './pages/Lounge';
import NotFoundPage from './pages/NotFoundPage';
import ProductLists from './pages/ProductLists';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="linkPage" element={<LinkPage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="lounge" element={<Lounge />} />
            <Route path=":pdCategory" element={<ProductDetail />} />
            <Route path="product" element={<ProductLists />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
