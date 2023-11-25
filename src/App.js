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
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import MyPage from './pages/MyPage';
import ModalProvider from './provider/ModalProvider';
import ContextProvider from './provider/ContextProvider';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ContextProvider>
          <Nav />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="linkPage" element={<LinkPage />} />
              <Route path="admin" element={<Admin />} />
              <Route path="lounge" element={<Lounge />} />
              <Route path=":pdTitle" element={<ProductDetail />} />
              <Route path="product" element={<ProductLists />} />
              <Route path="notice" element={<Notice />}>
                <Route path=":id" element={<NoticeDetail />} />
              </Route>
              <Route path="mypage" element={<MyPage />} />
              <Route path="search/" element={<Search />}>
                <Route path=":pdCategory" element={<Search />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <Footer />
          <ModalProvider />
        </ContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
