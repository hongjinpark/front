import './App.module.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Test from './components/Test';
import Login from './pages/Login';
// import Nav from './components/Nav';
// import Footer from './components/Footer';
import LinkPage from './pages/LinkPage';
import Admin from './pages/Admin';
import Lounge from './pages/Lounge';
import NotFoundPage from './pages/NotFoundPage';
import ProductLists from './pages/ProductLists';
import ProductDetail from './pages/ProductDetail';
import MyPage from './pages/MyPage';
import Header from './pages/Header';
import Home from './pages/Home';
import ModalProvider from './provider/ModalProvider';
import ContextProvider from './provider/ContextProvider';

function App() {
  return (
    <Router>
      <ContextProvider>
        <div className="flex flex-col min-h-screen">
          {/* <Nav /> */}
          <Header />
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
              <Route path="mypage" element={<MyPage />} />
            </Route>
            {/* <Route path="/test" element={<Test />} /> */}
          </Routes>
          {/* <Footer /> */}
        </div>
        <ModalProvider />
      </ContextProvider>
    </Router>
  );
}

export default App;
