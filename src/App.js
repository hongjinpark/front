import './App.module.css';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Test from './components/Test';
import Login from './pages/Login';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LinkPage from './pages/LinkPage';
import Admin from './pages/Admin';
import Lounge from './pages/Lounge';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetail from './pages/ProductDetail';
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import MyPage from './pages/MyPage';
import ModalProvider from './provider/ModalProvider';
import ContextProvider from './provider/ContextProvider';
import Search from './pages/Search';
import NoticeWrite from './pages/NoticeWrite';
import NoticeUpdate from './pages/NoticeUpdate';
import React from 'react';
import SearchResult from './pages/SearchResult';
import AdminRoute from './components/route/AdminRoute';
import { CustomRouter } from './utils/CustomRouter';
import history from './utils/history';
import RequireAuth from './utils/ReqireAuth';
import Regist from './pages/Regist';
import Product from './pages/Product';

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

function App() {
  return (
    <ErrorBoundary>
      <CustomRouter history={history}>
        <ContextProvider>
          <Nav />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="regist" element={<Regist />} />
              <Route path="product" element={<Product />} />
              <Route path="linkPage" element={<LinkPage />} />
              <Route path="admin" element={<Admin />} />
              <Route path="lounge" element={<Lounge />} />
              <Route path=":product_id" element={<ProductDetail />} />
              <Route path="notice" element={<Notice />}>
                <Route path=":id" element={<NoticeDetail />} />
              </Route>
              <Route
                path="mypage"
                element={
                  <RequireAuth>
                    <MyPage />
                  </RequireAuth>
                }
              />
              <Route element={<AdminRoute />}>
                <Route path="notice/write" element={<NoticeWrite />}></Route>
                <Route
                  path="notice/update/:id"
                  element={<NoticeUpdate />}
                ></Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="search">
              <Route index element={<Search />} />
              <Route path=":searchWord" element={<SearchResult />} />
              <Route path="notice/write" element={<NoticeWrite />}></Route>

              <Route path="mypage" element={<MyPage />} />
            </Route>
            <Route path="search">
              <Route index element={<Search />} />
              <Route path=":searchWord" element={<SearchResult />} />
            </Route>
          </Routes>

          <Footer />
          <ModalProvider />
        </ContextProvider>
      </CustomRouter>
      /
    </ErrorBoundary>
  );
}

export default App;
