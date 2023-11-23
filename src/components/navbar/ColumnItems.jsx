import ColumnItemItems from './ColumnItemItems';
import styles from './CategoryList.module.css';

export default function ColumnItems({ subItem }) {
  return (
    <ul
      className={`pt-6 even:bg-white pb-7 2xl:pb-8 2xl:pt-7 max-h-[calc(100vh-220px)] ${styles.container} overflow-y-scroll`}
      key={subItem.id}
    >
      {subItem.columnItems.map((columnItems) => (
        <ColumnItemItems columnItems={columnItems} key={columnItems.seq} />
      ))}
    </ul>
  );
}
