import { useNavigate } from 'react-router-dom';
import { updateProductStatus } from './../../api/product.api';
export default function MyPageProductMore({
  step,
  setStep,
  handleClose,
  product,
}) {
  const navigate = useNavigate();
  const attributesData = [
    {
      name: '전체',
      value: '',
    },
    {
      name: '판매중',
      value: 'Y',
    },
    {
      name: '예약중',
      value: 'R',
    },
    {
      name: '판매완료',
      value: 'C',
    },
  ];
  const handleChangeStatus = (status) => {
    updateProductStatus(product.product_id, status);
    navigate(0);
  };
  const nomal = () => {
    return (
      <div className="relative">
        <h2 className="text-center text-[rgb(20_19_19)] text-[18px] mb-4 font-semibold">
          더 보기
        </h2>
        <button
          onClick={() => handleClose()}
          className="absolute right-0 top-2"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="w-5 h-5 -mt-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
          </svg>
        </button>
        <ul className="[&>li]:py-3 [&>li]:cursor-pointer text-[rgb(20_19_19)] pt-5">
          <li>상품수정</li>
          <li onClick={() => setStep('change')} role="presentation">
            상태변경
          </li>
          <li onClick={() => setStep('delete')} role="presentation">
            상품삭제
          </li>
        </ul>
      </div>
    );
  };
  const change = () => {
    return (
      <div className="flex flex-col justify-center w-full h-full">
        <h2 className="text-center text-[rgb(20_19_19)] text-[18px] mb-4 font-semibold">
          상태변경
        </h2>
        <button
          onClick={() => handleClose()}
          className="absolute top-[40px] right-[40px]"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="w-5 h-5 mt-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
          </svg>
        </button>
        <ul className="[&>li]:py-3 [&>li]:cursor-pointer text-[rgb(20_19_19)]">
          {attributesData.map((data) => (
            <>
              {data.value !== '' && product.pdStatus != data.value && (
                <li className="py-[14px] [&>button]:w-full [&>button]:text-left">
                  <button onClick={() => handleChangeStatus(data.value)}>
                    {data.name}
                  </button>
                </li>
              )}
            </>
          ))}
        </ul>
      </div>
    );
  };
  const deleteProduct = () => {
    return (
      <div className="[&>p]:text-center text-[rgb(20_19_19)]">
        <p className="pb-4">
          상품을 삭제하시겠습니까? <br />
          삭제된 상품은 복구되지 않습니다.
        </p>
        <div className="flex gap-2 [&>button]:px-0">
          <button
            onClick={() => handleClose()}
            className="text-[13px] md:text-sm w-[calc(50%-4px)] leading-4 cursor-pointer font-semibold text-center justify-center rounded-md md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 text-[rgb(20_19_19)] border-[rgb(20_19_19)] border-[1px]"
          >
            취소
          </button>
          <button className="text-[13px] w-[calc(50%-4px)] md:text-sm leading-4 items-center font-semibold font-body text-center justify-center border-0  bg-[rgb(20_19_19)] rounded-md bg-heading text-white md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600">
            삭제
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="border-[2px] border-[rgb(20_19_19)] w-full h-full rounded-md p-8">
      <div className="flex flex-col justify-center w-full h-full">
        {step === 'nomal' && nomal()}
        {step === 'change' && change()}
        {step === 'delete' && deleteProduct()}
      </div>
    </div>
  );
}
