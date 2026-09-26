import { IoSearch } from 'react-icons/io5';

const Hero = ({ searchQuery, onSearchChange, toolCount }) => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
          Discover the Best{' '}
          <span className="text-indigo-600 dark:text-indigo-400">AI Tools</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Explore useful AI tools for videos, images, coding, productivity and more.
        </p>

        {/* Hero search */}
        <div className="mt-8 max-w-lg mx-auto">
          <div className="relative">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              id="hero-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full pl-12 pr-4 py-3.5 text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              aria-label="Search AI tools"
            />
          </div>
        </div>

        {toolCount > 0 && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            {toolCount} AI {toolCount === 1 ? 'tool' : 'tools'} available
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
