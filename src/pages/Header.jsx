import NavButton from '../components/navbar/NavButton';
import Search from '../components/navbar/Search';
import Logo from '../components/navbar/Logo';
import NavMenu from './../components/navbar/NavMenu';

export default function Header() {
  return (
    <header className="relative z-20 w-full h-16 sm:h-20 lg:h-36 xl:h-40 max-[480px]:mt-0 headerThree">
      <div className="fixed z-20 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-36 xl:h-40 md:px-8 lg:px-0">
        <div className="flex items-center mx-auto px-0 lg:px-8 2xl:px-16 max-w-[1280px] h-full lg:h-20 xl:h-24 relative before:absolute before:w-screen before:bg-[#F1F1F1] before:bottom-0 box-content justify-around">
          <Logo />
          <Search />
          <NavButton />
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
