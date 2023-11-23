export default function Logo() {
  return (
    <div className="flex items-center 2xl:me-12 3xl:me-20 place-self-stretch max-[1023px]:flex-auto max-[1023px]:ml-[10px] ">
      <a
        style={{ width: '200px', height: '30px' }}
        className="max-[1023px]:!w-[97px] max-[1023px]:!h-[16px] inline-flex focus:outline-none relative"
        href="/"
      >
        <span className="box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0">
          <img
            alt="Joonggonara"
            src="https://web.joongna.com/assets/images/custom-logo.svg"
          ></img>
        </span>
      </a>
    </div>
  );
}
