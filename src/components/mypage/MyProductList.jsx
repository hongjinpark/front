import image from '../../assets/images/product/9e1eed78-efc7-4af9-a0cb-acaff2dc5edd.webp';
export default function MyProductList({ product }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ">
      <div className="relative">
        <a
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          title="test"
          href="/product/142621001"
        >
          <div className="relative w-full rounded-md overflow-hidden pt-[100%] mb-3 md:mb-3.5">
            <img
              alt="test"
              referrerPolicy="no-referrer"
              src={image}
              decoding="async"
              data-nimg="fill"
              className="bg-gray-300 object-cover w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none"
              loading="lazy"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: '0px',
                color: 'transparent',
              }}
            ></img>
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="line-clamp-2 text-sm md:text-base text-heading">
              {product.pdTitle}
            </h2>
            <div className="font-semibold space-s-2 mt-0.5 text-heading lg:text-lg lg:mt-1.5">
              {product.price}원
            </div>
            <div className="my-1">
              <span className="text-sm text-gray-400"></span>
              <span className="text-sm text-gray-400 mx-1 hidden">|</span>
              <span className="text-sm text-gray-400"></span>
            </div>
            <div className="flex items-center"></div>
          </div>
        </a>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="absolute w-6 h-6 cursor-pointer right-2 bottom-8"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
}
