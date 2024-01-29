import Modal from './Modal';
import RegionModalContext from '../../context/RegionModalProvider';
import { useContext, useEffect, useState } from 'react';
import regions from '../../data/areas.json';
import { getRegion, saveRegion } from '../../api/region.api';
import ToastContext from '../../context/ToastContext';

export default function RegionModal() {
  const [inputValue, setInputValue] = useState('');
  const [foundLocations, setFoundLocations] = useState([]);
  const [click, setClick] = useState(false);
  const { isOpen, setIsOpen } = useContext(RegionModalContext);
  const toastContext = useContext(ToastContext);
  useEffect(() => {
    if (isOpen) getRegion().then((res) => setInputValue(res.data.regionName));
  }, [isOpen]);

  const handleSaveRegion = () => {
    if (!click) return;
    saveRegion(inputValue).then(() => {
      toastContext.setToastMessage(['변경되었습니다.']);
      setIsOpen(false);
    });
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력 값에 따라 지역을 찾습니다.
    const foundLocation = findLocations(value);
    setFoundLocations(foundLocation);
  };

  const findLocations = (value) => {
    // 입력된 값으로 지역을 찾습니다.
    const foundLocations = [];

    for (const area of Object.values(regions)) {
      if (area.area_title.includes(value)) {
        foundLocations.push(area.area_title);
      }
    }

    return foundLocations;
  };
  const headerContent = () => {
    return (
      <div className="flex px-3 py-2">
        <div className="flex-1 w-full h-14 relative text-base font-medium leading-5 text-[rgb(51,51,51)] px-[15px] py-2.5 rounded-md bg-[rgb(241,244,246)]">
          <button
            // onClick={handleGet}
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
            placeholder="지역명을 입력해주세요."
            autoComplete="off"
            value={inputValue}
            onChange={(e) => {
              handleInputChange(e);
              setClick(false);
            }}
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     handleGet();
            //   }
            // }}
          ></input>
          {foundLocations.length > 0 && !click && (
            <div className="mt-4 border-solid border-3 rounded-xl p-2">
              <ul>
                {foundLocations.slice(0, 15).map((foundLocation, index) => (
                  <li
                    role="presentation"
                    key={index}
                    className="pb-3 text-lg font-semibold hover:cursor-pointer"
                    onClick={() => {
                      setInputValue(foundLocation);
                      setClick(true);
                    }}
                  >
                    {foundLocation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* <button
          type="submit"
          //   onClick={() => setPopupVisible(true)}
          className="flex items-center justify-center h-14 border rounded text-[rgb(51,51,51)] text-center text-base leading-5 font-medium ml-2 px-4 py-2.5 border-solid border-[rgb(225,225,225)]"
        >
          <span className="pt-0.5">상세필터</span>
        </button> */}
      </div>
    );
  };
  const bodyContent = () => {
    return (
      <div
        id="container"
        className="flex flex-col flex-1 w-full h-full bg-white justify-end mb-10"
      >
        <div>
          <div>
            <div className="flex justify-center items-center bg-white self-end mt-8 px-5">
              <button
                onClick={() => handleSaveRegion()}
                disabled=""
                className="relative flex rounded justify-center items-center w-full h-14 bg-black text-white"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      ModalContext={RegionModalContext}
      title={'지역 수정'}
      headerContent={headerContent()}
      bodyContent={bodyContent()}
    />
  );
}
