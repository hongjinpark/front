import MyPageOption from './MyPageOption';

export default function MyPageProductHeader({
  myProducts,
  attributesData,
  setStatus,
  status,
}) {
  return (
    <div className="items-center justify-between block mb-4 md:flex lg:mb-7">
      <div className="flex-shrink-0 mb-1 text-xs leading-4 text-body md:text-sm pe-4 md:me-6 lg:ps-2 lg:block">
        {myProducts.length} 개의 상품
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="mr-0 lg:mr-4">
          <ul className="colors flex flex-nowrap -me-3">
            {attributesData.map((attribute) => (
              <MyPageOption
                key={attribute.name}
                attribute={attribute}
                setStatus={setStatus}
                status={status}
              />
            ))}
          </ul>
        </div>
        <div className="relative my-2 sm:m-0 lg:ms-0 z-10 min-w-[160px]">
          <button
            className="border border-gray-300 text-heading text-xs md:text-sm font-semibold relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer"
            id="headlessui-listbox-button-:rg:"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            data-headlessui-state=""
          >
            <span className="block truncate">최신순</span>
            <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
