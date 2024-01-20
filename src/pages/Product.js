import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useAuth from './../hooks/useAuth';
import styles from '../pages/Search.module.css';

const Product = () => {
  const [imageList, setImageList] = useState([]);
  const [product, setProduct] = useState({
    pdTitle: '',
    pdContents: '',
    pdCategory: '',
    price: '',
  });

  const [topicList, setTopicList] = useState([]);
  const { auth } = useAuth();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [category, setCategory] = useState('');

  // 임의의 버튼을 클릭하면 아래 함수를 실행하도록 한다.
  const onClickSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    imageList.forEach((image) => {
      formData.append('productImgFileList', image);
    });

    const value = {
      pdTitle: product.pdTitle,
      pdContents: product.pdContents,
      pdCategory: product.pdCategory,
      price: product.price,
    };

    const blob = new Blob([JSON.stringify(value)], {
      type: 'application/json',
    });

    formData.append('productDto', blob); // 또는  formData.append("data", JSON.stringify(value)); // JSON 형식으로 파싱.(백엔드의 요청에 따라 전송방식이 달라진다.)
    // axios를 이용한 post 요청. 헤더를 multipart/form-data 로 한다.
    const token = localStorage.getItem('login');
    token
      ? axios({
          method: 'POST',
          url: `http://localhost:8090/product/new`,
          mode: 'cors',
          headers: {
            'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
            'Authorization': `Bearer ${token}`,
          },
          data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
      : null;
    alert('게시글이 등록되었습니다');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    setErrMsg('');
    console.log(errMsg);
  }, [product]);

  useEffect(() => {
    axios.get('http://localhost:8090/topics').then((result) => {
      setTopicList(result.data);
    });
  }, []);

  const onChangeImageInput = (e) => {
    setImageList([...imageList, ...e.target.files]);
  };
  console.log(auth.nickname);

  return (
    <div>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Container className={styles.section}>
        <Form onSubmit={onClickSubmit} className="mx-auto w-full max-w-[768px]">
          <Form.Group
            as={Row}
            className="flex flex-col justify-center mt-6 lg:mt-8"
          >
            <Col sm>
              <Form.Control
                type="file"
                id="imageList"
                name="imageList"
                accept="image/jpg,image/png,image/jpeg,image/gif/png/webp"
                multiple
                required
                onChange={onChangeImageInput}
              />
            </Col>
          </Form.Group>
          <Form.Group
            style={{ marginTop: 20 }}
            as={Row}
            className="flex flex-col justify-center mt-6 lg:mt-8"
          >
            <Col sm>
              <Form.Control
                type="text"
                id="pdTitle"
                name="pdTitle"
                placeholder="상품명"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:border-heading h-11 md:h-12 focus:outline-none rounded-md"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
                required
                onChange={(e) =>
                  setProduct({ ...product, pdTitle: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <div className="flex flex-col justify-center mt-6 lg:mt-8">
            <div className="flex flex-row w-full overflow-hidden text-sm font-medium h-60">
              <div
                id="pdCategory"
                className="w-1/3 h-full overflow-y-auto border border-solid rounded border-jnGray-300"
              >
                <ul className={styles.categoryList}>
                  {topicList.map((topic) => {
                    return (
                      <li
                        onClick={() => setCategory(topic.topic_name)}
                        className={styles.topicList}
                        key={topic.topic_id}
                        role="presentation"
                      >
                        <p className="truncate break-keep">
                          {topic.topic_name}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                id="category-depth-3"
                className="w-1/3 h-full overflow-y-auto border border-solid rounded border-jnGray-300 hidden"
              ></div>
            </div>
          </div>
          <Form.Group
            style={{ marginTop: 20 }}
            as={Row}
            className="flex flex-col justify-center mt-6 lg:mt-8"
          >
            <Col sm>
              <Form.Control
                type="text"
                value={category}
                id="pdCategory"
                name="pdCategory"
                placeholder="카테고리"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:border-heading h-11 md:h-12 focus:outline-none rounded-md"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
                required
                onChange={() =>
                  setProduct({ ...product, pdCategory: category })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            style={{ marginTop: 20 }}
            as={Row}
            className="flex flex-col justify-center mt-6 lg:mt-8"
          >
            <Col sm>
              <Form.Control
                type="text"
                id="price"
                name="price"
                placeholder="판매가격"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:border-heading h-11 md:h-12 focus:outline-none rounded-md"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
                required
                requiredplaceholder="판매가격"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="flex flex-col justify-center mt-6 lg:mt-8"
          >
            <Col sm>
              <Form.Control
                id="pdContents"
                onChange={(e) =>
                  setProduct({ ...product, pdContents: e.target.value })
                }
                name="pdContents"
                className="px-4 py-3 items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 bg-white border border-gray-300 focus:shadow focus:outline-none focus:border-heading placeholder-body inline-block w-full px-4 py-4 mt-6 outline-none align-middle overflow-x-scroll appearance-none resize-none border-solid border border-jnGray-300 placeholder:text-jnGray-500 h-[220px] text-sm"
                autoComplete="off"
                spellCheck="false"
                rows="4"
                placeholder="내용을 입력해주세요."
                maxLength="1000"
              />
            </Col>
          </Form.Group>
          <div style={{ marginTop: 40 }} className="d-grid gap-1">
            <Button
              variant="secondary"
              type="submit"
              className="bg-[rgb(108,117,125)]"
            >
              등록
            </Button>
          </div>
        </Form>
      </Container>
      <div style={{ marginTop: 50 }}></div>
    </div>
  );
};

export default Product;
