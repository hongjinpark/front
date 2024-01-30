import { useEffect, useState } from 'react';
import MyPageOption from './MyPageOption';

export default function MyPageProductHeader({
  myProducts,
  setMyProducts,
  attributesData,
  setStatus,
  status,
}) {
  const option = [
    {
      name: '최신순',
      value: 'RECENT_SORT',
    },
    {
      name: '낮은가격순',
      value: 'PRICE_ASC_SORT',
    },
    {
      name: '높은가격순',
      value: 'PRICE_DESC_SORT',
    },
  ];
  const [state, setState] = useState(option[0]);
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sort = () => {
    if (state.value === 'PRICE_ASC_SORT')
      return myProducts.sort((a, b) => a.price - b.price);
    if (state.value === 'PRICE_DESC_SORT')
      return myProducts.sort((a, b) => b.price - a.price);
    if (state.value === 'RECENT_SORT')
      return myProducts.sort((a, b) => b.product_id - a.product_id);
  };

  useEffect(() => {
    console.log(sort());
    setMyProducts((prev) => [...prev], sort());
  }, [state, setMyProducts, sort]);
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
            onClick={() => setIsOpen(!isOpen)}
            className="border border-gray-300 text-heading text-xs md:text-sm font-semibold relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer"
            type="button"
          >
            <span className="block truncate">{state.name}</span>
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
          {isOpen && (
            <ul
              className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-xs md:text-sm"
              id="headlessui-listbox-options-:rn:"
            >
              {option.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    setIsOpen(false);
                    setState(option);
                  }}
                  className="text-gray-900
                            cursor-default select-none relative py-2 ps-10 pe-4"
                  role="option"
                  tabIndex="-1"
                  aria-selected="false"
                >
                  <span className="font-normal block truncate">
                    {option.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
