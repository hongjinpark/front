import CategoryButton from './CartegoryButton';

export default function NavMenu() {
  return (
    <div className="items-center hidden lg:flex lg:h-16 headerBottom mx-auto max-w-[1280px] md:px-8 2xl:px-16 box-content">
      <div className="flex items-center">
        <CategoryButton />
      </div>
    </div>
  );
}
