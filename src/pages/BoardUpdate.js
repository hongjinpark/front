import styles from './Write.module.css';
import axios from 'axios';
import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ToastContext from '../context/ToastContext';

// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// // import Image from 'react-bootstrap/Image';
// import Row from 'react-bootstrap/Row';

import { Form } from 'react-bootstrap';

export default function BoardUpdate() {
  const navigator = useNavigate();
  // const role = localStorage.getItem('role');

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');
  const toastContext = useContext(ToastContext);

  const [imageList, setImageList] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const fileInput = useRef();
  const { id } = useParams();
  const token = localStorage.getItem('login');

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
  };

  useEffect(() => {
    function getData() {
      axios.get(`http://localhost:8090/board/list`).then((res) => {
        const result = res.data;
        setTitle(result[result.findIndex((v) => v.boardId == id)].bdSubject);
        setcontents(
          result[result.findIndex((v) => v.boardId == id)].bdContents
        );
        console.log(result.boardImageDtoList);
      });
    }
    getData();
  }, []);

  const Save = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    imageList.forEach((image) => {
      formData.append('boardImgFileList', image);
    });

    const value = {
      bdSubject: titleValue,
      bdContents: contentsValue,
    };

    const blob = new Blob([JSON.stringify(value)], {
      type: 'application/json',
    });

    formData.append('boardDto', blob);

    if (titleValue !== '' && contentsValue !== '') {
      token
        ? await axios
            .put('http://localhost:8090/board/list/' + id, formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
                'Authorization': `Bearer ${token}`,
              },
            })
            .then(() => {
              toastContext.setToastMessage(['작성이 완료되었습니다']);
              navigator('/board', { replace: true });
            })
        : null;
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
      setImageList([...imageList, ...e.target.files]);
      setPreviewImg(imgUrlList);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <h3>게시판 수정</h3>
        <Button
          variant="outline-secondary"
          className={styles.save}
          onClick={Save}
        >
          등록
        </Button>
        <button
          onClick={() => {
            console.log(id);
          }}
        >
          test
        </button>
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

        {previewImg.map((imgsrc, index) => (
          <div
            className={styles.img_card}
            key={index}
            role="presentation"
            onClick={() => {
              const deletePreImg = [...previewImg];
              deletePreImg.splice(index, 1);
              setPreviewImg(deletePreImg);

              const deleteImg = [...imageList];
              deleteImg.splice(index, 1);
              setImageList(deleteImg);

              fileInput.current.value = '';
            }}
          >
            <img className={styles.img} src={imgsrc} alt="thumbnail" />
            <p>X</p>
          </div>
        ))}
      </div>
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
