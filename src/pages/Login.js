import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api/user.api';

import { Button, Container, Col, Row, Form } from 'react-bootstrap';
import { httpApi } from './../api/axios';
import secureLocalStorage from 'react-secure-storage';
import styles from '../pages/Search.module.css';
import ToastContext from '../context/ToastContext';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const errRef = useRef();

  const [user, setUser] = useState({ email: '', password: '' });
  const [errMsg, setErrMsg] = useState('');

  const toastContext = useContext(ToastContext);
  useEffect(() => {
    setErrMsg('');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      const responseUser = response?.data;
      const accessToken = response?.data?.token;
      secureLocalStorage.setItem('role', response?.data?.role);
      localStorage.setItem('login', accessToken);
      localStorage.setItem('user', JSON.stringify(response.data));
      httpApi.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`;
      setAuth(responseUser);
      setUser('');
      toastContext.setToastMessage(['로그인 되었습니다']);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        toastContext.setToastMessage(['이메일 또는 비밀번호를 확인해주세요.']);
      } else if (err.response?.status === 400) {
        alert('Missing Username or Password');
      } else if (err.response?.status === 401) {
        alert('Unauthorized');
      } else {
        alert('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        // height: '50vh',
        height: '600px',
        margin: '0 auto',
        // padding: '140px 0px 0px 0px',

        // border: '1px solid black',
      }}
    >
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Container className={styles.section2}>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} ClassName="mb-3" controlId="formBasicEmail">
            <Col sm>
              <Form.Control
                type="username"
                id="username"
                autoComplete="off"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
                placeholder="Email"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            ClassName="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                style={{ marginTop: 20 }}
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                required
                requiredplaceholder="Password"
                placeholder="Password"
              />
            </Col>
          </Form.Group>
          <div style={{ marginTop: 20 }} className="d-grid gap-1">
            <Button
              variant="secondary"
              type="submit"
              className="bg-[rgb(108,117,125)]"
            >
              로그인
            </Button>
          </div>
          <div style={{ marginTop: 20 }} className="d-grid gap-1">
            <Button
              variant="secondary"
              type="submit"
              className="bg-[rgb(108,117,125)]"
            >
              <Link
                to="/regist"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                회원가입
              </Link>
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
