import { IoSearchOutline } from 'react-icons/io5';

const EmptyState = ({ searchQuery, activeCategory, onClearSearch, onClearCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <IoSearchOutline className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>
      <p className="text-base font-medium text-gray-900 dark:text-white mb-1">No AI tools found</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Try another search or category.
      </p>
      <div className="flex gap-3">
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            Clear search
          </button>
        )}
        {activeCategory !== 'All' && (
          <button
            onClick={onClearCategory}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            Show all categories
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
