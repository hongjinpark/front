export default function MyPageOption({ attribute, setStatus, status }) {
  return (
    <li
      role="presentation"
      onClick={() => setStatus(attribute.value)}
      className={`shrink-0 cursor-pointer rounded-full border border-gray-100 p-1 px-2 mr-1 sm:mr-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black ${
        status === attribute.value && 'border-black'
      }`}
    >
      {attribute.name}
    </li>
  );
}
