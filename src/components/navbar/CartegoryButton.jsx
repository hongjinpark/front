import CategoryList from './CategoryList';
import styles from './CategoryList.module.css';
export default function CategoryButton() {
  return (
    <div
      className={`relative flex-shrink-0 hidden lg:block ${styles.categoryMenu}`}
    >
      <div className="flex items-center justify-center gap-2 px-3.5 xl:px-4 text-sm relative before:absolute before:-bottom-2.5 before:h-2.5 before:w-full before:z-10 font-semibold text-white transition-colors rounded-md cursor-pointer h-11 bg-heading hover:bg-black bg-slate-800">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 20 20"
          className="text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        카테고리
      </div>
      <CategoryList />
    </div>
  );
}
