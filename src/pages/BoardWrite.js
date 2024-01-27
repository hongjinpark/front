import styles from './Write.module.css';
import axios from 'axios';
import { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ToastContext from '../context/ToastContext';

// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// // import Image from 'react-bootstrap/Image';
// import Row from 'react-bootstrap/Row';

import { Form } from 'react-bootstrap';

export default function NoticeDetail() {
  const navigator = useNavigate();
  // const role = localStorage.getItem('role');

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');
  const toastContext = useContext(ToastContext);

  const [imageList, setImageList] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const fileInput = useRef();

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
  };
  const Save = () => {
    if (titleValue !== '' && contentsValue !== '') {
      axios
        .post('http://localhost:8090/board/new', {
          noticeContents: contentsValue,
          noticeTitle: titleValue,
        })
        .then(() => {
          toastContext.setToastMessage(['작성이 완료되었습니다']);
          navigator('/board', { replace: true });
        });
    } else if (titleValue == '') {
      toastContext.setToastMessage(['제목을 입력해주세요']);
    } else {
      toastContext.setToastMessage(['내용을 입력해주세요']);
    }
  };

  const onChangeImageInput = (e) => {
    const fileArr = e.target.files;
    const imgUrlList = [...previewImg];

    if (previewImg.length + fileArr.length > 6) {
      toastContext.setToastMessage(['사진은 6개까지 등록 가능합니다']);
    } else {
      for (let i = 0; i < fileArr.length; i++) {
        const imgUrl = URL.createObjectURL(fileArr[i]);
        imgUrlList.push(imgUrl);
      }
      setImageList(imgUrlList); //에러 방지
      setPreviewImg(imgUrlList);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <h3>게시판 글쓰기</h3>
        <Button
          variant="outline-secondary"
          className={styles.save}
          onClick={Save}
        >
          등록
        </Button>
      </div>
      <div className={styles.img_form}>
        <Form.Control
          type="file"
          id="imageList"
          name="imageList"
          accept="image/jpg,image/png,image/jpeg,image/gif/png/webp"
          multiple
          ref={fileInput}
          required
          onChange={onChangeImageInput}
        />
        {/* <Container className={styles.img_list}>
          <Row> */}
        {previewImg.map((imgsrc, index) => (
          <div
            className={styles.img_card}
            key={index}
            role="presentation"
            onClick={() => {
              const deleteImg = [...previewImg];
              deleteImg.splice(index, 1);
              setPreviewImg(deleteImg);
              fileInput.current.value = '';
            }}
          >
            <img className={styles.img} src={imgsrc} alt="thumbnail" />
            <p>X</p>
          </div>
        ))}
        {/* </Row>
        </Container> */}
      </div>
      <button
        onClick={() => {
          console.log(imageList.length);
        }}
      >
        test
      </button>
      <div className={styles.top_title}>
        <input
          className={styles.title_text}
          placeholder="제목을 입력해주세요"
          defaultValue={titleValue}
          onChange={saveTitle}
        ></input>
      </div>
      <div className={styles.buttom_contents}>
        <textarea
          className={styles.contents_text}
          placeholder="내용을 입력해주세요"
          defaultValue={contentsValue}
          onChange={saveContent}
        ></textarea>
      </div>
    </div>
  );
}
