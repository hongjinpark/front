import styles from './CategoryList.module.css';
import ColumnItems from './ColumnItems';
export default function Column({ item }) {
  return (
    <li key={item.seq}>
      <a
        className="flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300"
        href="category={item.indexOf}"
      >
        {item.label}
      </a>
      <div
        className={`absolute flex bg-white ${styles.categoryMegaMenu} shadow-header w-[630px] xl:w-[1000px] 2xl:w-[1200px] start-full`}
      >
        <div className="flex-shrink-0">
          <div
            className={`absolute bg-gray-200 ${styles.megaMenu} shadow-header -start-28 xl:start-0`}
          >
            <div className="grid grid-cols-3">
              {item.columns.map((subItem) => (
                <ColumnItems subItem={subItem} key={subItem.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
