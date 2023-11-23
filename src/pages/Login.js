import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api/user.api';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Col, Row, Form } from 'react-bootstrap';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const errRef = useRef();

  const [user, setUser] = useState({ email: '', password: '' });
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(user);
      const responseUser = response?.data;
      const accessToken = response?.data?.token;
      localStorage.setItem('login', response.data.token);
      const roles = response?.data?.role;
      setAuth({ responseUser, roles, accessToken });
      setUser('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
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
        width: '100%',
        height: '100vh',
      }}
    >
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Container className="panel">
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
                requiredplaceholder="Password"
                placeholder="Password"
              />
            </Col>
          </Form.Group>
          <div style={{ marginTop: 20 }} className="d-grid gap-1">
            <Button variant="secondary" type="submit">
              로그인
            </Button>
          </div>

          <div style={{ marginTop: 20 }} className="d-grid gap-1">
            <Button variant="secondary" type="submit">
              <Link to="/register">회원가입</Link>
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
