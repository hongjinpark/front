export default function ColumnItemItems({ columnItems }) {
  return (
    <>
      <li className="mb-6" key={columnItems.seq}>
        <a
          className="block text-lg py-2.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300 text-slate-950"
          href={`/search?category=${columnItems.seq}`}
        >
          {columnItems.label}
        </a>
      </li>
      {columnItems.columnItemItems.map((columnItemItems, index, array) =>
        index === array.length - 1 ? (
          <li
            className="border-b border-gray-300 pb-3.5 mb-3"
            key={columnItemItems.seq}
          >
            <a
              className="block text-base py-2.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
              href={`/search?category=${columnItemItems.seq}`}
            >
              {columnItemItems.label}
            </a>
          </li>
        ) : (
          <li key={columnItemItems.seq}>
            <a
              className="block text-base py-2.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
              href={`/search?category=${columnItemItems.seq}`}
            >
              {columnItemItems.label}
            </a>
          </li>
        )
      )}
    </>
  );
}
