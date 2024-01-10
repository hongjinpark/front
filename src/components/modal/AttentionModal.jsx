import { useContext, useEffect, useState } from 'react';
import AttentionModalContext from '../../context/AttentionModalProvider';
import Modal from './Modal';
import { searchAttention } from './../../api/history.api'; //추후 삭제 필요
import { formattedNumber, detailDate } from './../../utils/util';
import axios from 'axios';
import styles from './AttentionModal.module.css';

export default function AttentionModal() {
  const { isOpen, setIsOpen } = useContext(AttentionModalContext);
  const [text, setText] = useState('');
  const [attention, setAttention] = useState([]);
  const token = localStorage.getItem('login');

  // open시 get
  useEffect(() => {
    if (isOpen) {
      axios
        .get('http://localhost:8090/attention/lists/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setAttention(res.data))
        .catch(() => setIsOpen(false));
    }
  }, [isOpen]);

  //검색 버튼 클릭 동작
  const handleGet = () => {
    if (text == '') {
      axios
        .get('http://localhost:8090/attention/lists/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setAttention(res.data));
    }
    searchAttention(text).then((res) => {
      setAttention(res.data);
    });
  };

  const headerContent = () => {
    return (
      <div className="flex px-3 py-2">
        <div className="flex-1 w-full h-14 relative text-base font-medium leading-5 text-[rgb(51,51,51)] px-[15px] py-2.5 rounded-md bg-[rgb(241,244,246)]">
          <button
            onClick={handleGet}
            type="submit"
            className="flex items-center justify-center h-11 absolute appearance-none ml-[15px] rounded-none border-[none] left-0 inset-y-0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-auto rotate-0 text-[rgb(155,155,155)]"
            >
              <path
                stroke="currentColor"
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                stroke="currentColor"
                d="M21 21L17 17"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <input
            className="bg-inherit w-11/12 ml-[30px] h-full mr-[30px] focus:outline-none"
            type="search"
            id="searchWord"
            placeholder="상품명을 입력해주세요."
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGet();
              }
            }}
          ></input>
        </div>
      </div>
    );
  };
  const bodyContent = () => {
    return (
      <div className={styles.body}>
        {attention.length > 0 ? (
          attention.map((attentionItem) => (
            <div className={styles.card} key={attentionItem.attention_id}>
              <a href={'/' + attentionItem.product_id}>
                <div className={styles.cardFlex}>
                  <div className={styles.imgBox}>
                    <img
                      className={styles.img}
                      src={require(`../../assets${attentionItem.imgUrl}`)}
                      alt=""
                    />
                  </div>
                  <div className="h-20 flex flex-col flex-1 ml-5 items-start">
                    <p className={styles.title}>{attentionItem.pdTitle}</p>
                    <strong className={styles.price}>
                      {formattedNumber(attentionItem.price)}
                    </strong>
                    <span className={styles.date}>
                      {detailDate(attentionItem.regTime)}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="text-center px-0 py-[250px]">
            <p>관심 상품이 없습니다.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      ModalContext={AttentionModalContext}
      title={'관심 내역'}
      headerContent={headerContent()}
      bodyContent={bodyContent()}
    />
  );
}
