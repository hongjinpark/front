import ProfileModalContext from '../../context/ProfileModalProvider';
import Modal from './Modal';
import useAuth from './../../hooks/useAuth';
import { useState, useContext } from 'react';
import { saveUserInfo } from '../../api/user.api';
import ToastContext from '../../context/ToastContext';

export default function ProfileModal() {
  const { auth, setAuth, getNickName } = useAuth();
  const [profileImg, setProfileImg] = useState(auth?.userInfo?.url);
  const [usrNickName, setUsrNickName] = useState(getNickName());
  const toastContext = useContext(ToastContext);
  const { setIsOpen } = useContext(ProfileModalContext);

  const handleSaveUserInfo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    saveUserInfo({
      userInfoDto: { usrNickName },
      profileImg: profileImg,
    }).then((res) => {
      user.userInfo = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      setAuth(user);
      toastContext.setToastMessage(['변경되었습니다.']);
      setIsOpen(false);
    });
  };
  const bodyContent = () => {
    return (
      <div
        id="container"
        className="flex flex-col flex-1 w-full h-full bg-white"
      >
        <div className="flex-1">
          <main className="h-[calc(100vh-180px)] pt-7 px-5">
            <div className="relative pb-6 flex flex-col">
              <label
                className="block mb-3 font-normal text-base"
                htmlFor="userName"
              >
                프로필 이미지
              </label>
              <div className="flex">
                <label htmlFor="file-input" className="mr-4 w-1/2">
                  <img
                    className=" rounded-full mr-4"
                    src={
                      profileImg
                        ? URL.createObjectURL(profileImg)
                        : auth?.userInfo
                          ? require(`../../assets${auth.userInfo.imgUrl}`)
                          : 'profile.png'
                    }
                    alt="profile"
                    id="profile"
                    name="file-input"
                  />
                </label>
                <input
                  className="hidden"
                  type="file"
                  disabled=""
                  id="file-input"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setProfileImg(e.target.files[0]);
                  }}
                />
                <label
                  className="w-full 1text-sm text-slate-500 mr-4 py-2 rounded bg-white justify-center flex items-center border"
                  htmlFor="file-input"
                >
                  선택
                </label>
                <button
                  onClick={() => setProfileImg()}
                  className="relative w-full font-medium text-base border border-[rgb(218,222,229)] rounded py-3 px-4 "
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="relative pb-6">
              <label
                className="block mb-3 font-normal text-base"
                htmlFor="userName"
              >
                닉네임
              </label>
              <input
                className="relative w-full font-medium text-base border border-[rgb(218,222,229)] rounded py-3 px-4"
                type="text"
                disabled=""
                id="userName"
                value={usrNickName}
                onChange={(e) => setUsrNickName(e.target.value)}
              />
            </div>
          </main>
          <div>
            <div className="flex justify-center items-center bg-white self-end mt-8 px-5">
              <button
                onClick={() => handleSaveUserInfo()}
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
      ModalContext={ProfileModalContext}
      bodyContent={bodyContent()}
      title="프로필 수정"
    />
  );
}
