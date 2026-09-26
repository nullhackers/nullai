const SortSelect = ({ sortOption, onSortChange }) => {
  return (
    <select
      id="sort-select"
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)}
      className="px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 cursor-pointer"
      aria-label="Sort tools"
    >
      <option value="default">Default</option>
      <option value="a-z">A–Z</option>
      <option value="z-a">Z–A</option>
    </select>
  );
};

export default SortSelect;
