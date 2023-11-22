import useAuth from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';
import { useState } from 'react';

export default function NavButton() {
  const { auth } = useAuth();
  const [clicked, setClicked] = useState(false);
  const logout = useLogout();
  return (
    <div className="flex max-[1023px]:hidden">
      <ul className="flex text-sm font-normal list-none break-keep">
        <li className="flex items-center justify-center pr-3">
          <button className="flex items-center justify-center">
            <div className="relative cursor-pointer">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
              </svg>
              <div className="absolute -top-2 w-[24px] h-[24px] font-semibold -right-3 rounded-[50%] p-1 text-[11px] bg-jngreen text-center">
                0
              </div>
            </div>
            <p className="ml-5">채팅하기</p>
          </button>
        </li>
        <li className="flex items-center justify-center px-3 border-x-2">
          <a
            className="flex items-center justify-center [&amp;>p]:ml-2"
            href="/product/form?type=regist"
          >
            <svg
              fill="none"
              height="29"
              viewBox="0 0 24 24"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10 19h-3.8c-1.1201 0-1.68016 0-2.10798-.218-.37633-.1917-.68229-.4977-.87403-.874-.21799-.4278-.21799-.9879-.21799-2.108v-7.6c0-1.12011 0-1.68016.21799-2.10798.19174-.37633.4977-.68229.87403-.87403.42782-.21799.98788-.21799 2.10798-.21799h11.6c1.1201 0 1.6802 0 2.108.21799.3763.19174.6823.4977.874.87403.218.42782.218.98788.218 2.10798v.3m-12 1v-1m0 1h2.0001m-2.0001 0c-1.11721-.00002-1.99756.12616-1.9999 1.3325-.00176.9003-.00001 1.1675 1.99999 1.1675 2.00001 0 2.00001.2055 2.00001 1.1667 0 .7223-.0001 1.3333-2.0001 1.3333m0 1v-1m0 0h-1.9999m6.9999-4.5h3m-3 10 2.025-.405c.1765-.0353.2648-.053.3471-.0853.0731-.0286.1426-.0658.2069-.1107.0726-.0506.1362-.1142.2636-.2416l4.1574-4.1574c.5523-.5523.5523-1.4477 0-2s-1.4477-.5523-2 0l-4.1574 4.1574c-.1274.1274-.191.191-.2416.2636-.0449.0643-.0821.1338-.1107.2069-.0323.0823-.05.1706-.0853.3471z"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <p>판매하기</p>
          </a>
        </li>
        <li className="relative flex px-3">
          <button
            className="flex items-center justify-center [&amp;>p]:ml-2"
            onClick={() => setClicked(!clicked)}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            {auth && <p>{auth.nickname}</p>}
          </button>
          <div>
            {clicked && (
              <>
                {auth ? (
                  <ul className="absolute bg-slate-100 flex flex-col top-[30px] right-[5px] rounded-lg bg-opacity-100 [&>li]:py-3 [&>li]:mx-5 [&>li]:border-b [&>li]:border-gray-500 [&>li:last-of-type]:border-b-0 text-sm font-normal">
                    <li>
                      <a href="/mypage">마이페이지</a>
                    </li>
                    <li>
                      <a href="/" onClick={() => logout()}>
                        로그아웃
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="absolute bg-slate-100 flex flex-col top-[30px] right-[5px] rounded-lg bg-opacity-100 [&>li]:py-3 [&>li]:mx-5 [&>li]:border-b [&>li]:border-gray-500 [&>li:last-of-type]:border-b-0 text-sm font-normal">
                    <li>
                      <a href="/register">회원가입</a>
                    </li>
                    <li>
                      <a href="/login">로그인</a>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
