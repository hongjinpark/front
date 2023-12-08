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
import NoticeWrite from './pages/NoticeWrite';
<<<<<<< HEAD
import React from 'react';
import SearchResult from './pages/SearchResult';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 또는 기타 작업을 수행할 수 있습니다.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>에러가 발생했습니다.</div>;
    }

    return this.props.children;
  }
}
=======
import NoticeUpdate from './pages/NoticeUpdate';
>>>>>>> 4f1a560f0679bbd3e33edaf51e8a158311846bf3

function App() {
  return (
    <ErrorBoundary>
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
                <Route path="notice/write" element={<NoticeWrite />}></Route>
                <Route path="mypage" element={<MyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
<<<<<<< HEAD
              <Route path="search">
                <Route index element={<Search />} />
                <Route path=":searchWord" element={<SearchResult />} />
=======
              <Route path="notice/write" element={<NoticeWrite />}></Route>
              <Route
                path="notice/update/:id"
                element={<NoticeUpdate />}
              ></Route>
              <Route path="mypage" element={<MyPage />} />
              <Route path="search/" element={<Search />}>
                <Route path=":pdCategory" element={<Search />} />
>>>>>>> 4f1a560f0679bbd3e33edaf51e8a158311846bf3
              </Route>
            </Routes>
            <Footer />
            <ModalProvider />
          </ContextProvider>
        </AuthProvider>
      </Router>
      /
    </ErrorBoundary>
  );
}

export default App;
