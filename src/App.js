import './App.module.css';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Test from './components/Test';
import Login from './pages/Login';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LinkPage from './pages/LinkPage';
import Admin from './pages/Admin';
import Board from './pages/Board';
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
import React, { useEffect, useState } from 'react';
import SearchResult from './pages/SearchResult';
import AdminRoute from './components/route/AdminRoute';
import { CustomRouter } from './utils/CustomRouter';
import history from './utils/history';
import RequireAuth from './utils/ReqireAuth';
import Regist from './pages/Regist';
import Product from './pages/Product';
import ProductUpdate from './pages/ProductUpdate';
import BoardDetail from './pages/BoardDetail';
import ToastContext from './context/ToastContext';
import BoardWrite from './pages/BoardWrite';

import axios from './api/axios';
import secureLocalStorage from 'react-secure-storage';
import ToastPopup from './components/ToastPopup';
import BoardUpdate from './pages/BoardUpdate';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
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
  const [toastMessage, setToastMessage] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('login');
    if (token) {
      axios
        .post(
          '/token',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (!res.data) {
            localStorage.removeItem('login');
            secureLocalStorage.removeItem('role');
            localStorage.removeItem('user');
          }
        });
    }
  }, []);
  return (
    <ErrorBoundary>
      <CustomRouter history={history}>
        <ToastContext.Provider value={{ toastMessage, setToastMessage }}>
          <ContextProvider>
            <Nav />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="regist" element={<Regist />} />
                <Route
                  path="product"
                  element={
                    <RequireAuth>
                      <Product />
                    </RequireAuth>
                  }
                />
                <Route path="linkPage" element={<LinkPage />} />
                <Route path="admin" element={<Admin />} />
                <Route path="board" element={<Board />} />
                <Route path="board/:id" element={<BoardDetail />} />
                <Route path="board/update/:id" element={<BoardUpdate />} />
                <Route path="board/write" element={<BoardWrite />} />
                <Route path="product/:product_id" element={<ProductDetail />} />
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
                <Route
                  path="mypage/product/update/:id"
                  element={<ProductUpdate />}
                />
                <Route element={<AdminRoute />}>
                  <Route path="notice/write" element={<NoticeWrite />}></Route>
                  <Route
                    path="notice/update/:id"
                    element={<NoticeUpdate />}
                  ></Route>
                </Route>
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <ToastPopup
              toastMessage={toastMessage}
              setToastMessage={setToastMessage}
            />

            <Footer />
            <ModalProvider />
          </ContextProvider>
        </ToastContext.Provider>
      </CustomRouter>
    </ErrorBoundary>
  );
}

export default App;
