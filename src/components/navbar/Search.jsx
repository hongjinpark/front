export default function Search() {
  return (
    <div className="relative hidden w-1/2 ms-7 me-7 xl:ms-9 lg:block">
      <div className="relative flex items-center justify-between w-full rounded-md bg-slate-100">
        <form className="w-full" noValidate="" role="search">
          <label htmlFor="search" className="flex items-center justify-between">
            <span className="absolute top-0 left-0 flex items-center justify-center flex-shrink-0 w-12 h-full cursor-pointer md:w-14 focus:outline-none">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[16px] h-[16px] text-heading"
              >
                <path
                  d="M10.0278 19.0556C14.3233 19.0556 17.8056 15.5733 17.8056 11.2778C17.8056 6.98223 14.3233 3.5 10.0278 3.5C5.73223 3.5 2.25 6.98223 2.25 11.2778C2.25 15.5733 5.73223 19.0556 10.0278 19.0556Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="transparent"
                ></path>
                <path
                  d="M21 21.8999L15.5 16.8999"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <input
              type="search"
              id="search-header"
              className="w-full h-10 text-sm placeholder-gray-400 bg-transparent rounded-md outline-none ga4_main_top_search pe-4 ps-14 text-heading lg:text-base placeholder:text-sm"
              placeholder="어떤 상품을 찾으시나요?"
              aria-label="search-header"
              autoComplete="off"
            />
          </label>
        </form>
      </div>
    </div>
  );
}
