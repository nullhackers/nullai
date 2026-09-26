const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Filter by category">
      <button
        role="tab"
        aria-selected={activeCategory === 'All'}
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          activeCategory === 'All'
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={activeCategory === category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeCategory === category
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
