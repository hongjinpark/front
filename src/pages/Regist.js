import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { postApi } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Regist = () => {
  const [user, setUser] = useState({ email: '', password: '', nickname: '' });
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  const navigate = useNavigate();

  const handleRegist = (e) => {
    e.preventDefault();
    alert('회원가입 완료');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let path = '/user/new';

    // eslint-disable-next-line no-useless-catch
    try {
      const options = {
        path: path,
        data: {
          email: user.email,
          password: user.password,
          nickname: user.nickname,
        },
      };
      const getData = await postApi(options);
      setUser(getData);
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

  useEffect(() => {
    setErrMsg('');
  }, [user]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50vh',
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
          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="email"
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                requiredplaceholder="Email"
                placeholder="Email"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="password"
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                requiredplaceholder="Password"
                placeholder="Password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm>
              <Form.Control
                type="nickname"
                id="nickname"
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                value={user.nickname}
                requiredplaceholder="Nickname"
                placeholder="Nickname"
              />
            </Col>
          </Form.Group>
          <div style={{ marginTop: 20 }} className="d-grid gap-1">
            <Button variant="secondary" onClick={handleRegist} type="submit">
              회원가입
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Regist;
