import styles from './CategoryList.module.css';
import { list } from '../../data/categoryList';
import Column from './Column';
export default function CategoryList() {
  return (
    <div
      className={`absolute invisible bg-white opacity-0 shadow-header start-0 ${styles.subMenu}`}
      style={{
        width: '220px',
        top: 'calc(100% + 25px)',
        transition: ' all .4s',
      }}
    >
      <ul className="py-5 text-lg text-body max-h-[calc(100vh-220px)] overflow-y-hidden overflow-hidden font-semibold text-gray-500">
        {list.map((item) => (
          <Column item={item} key={item.seq} />
        ))}
      </ul>
    </div>
  );
}
