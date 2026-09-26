import { IoSearch } from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, toggleTheme, searchQuery, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="NullAI Home">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Null<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </span>
          </a>

          {/* Search — desktop */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                id="header-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                aria-label="Search AI tools"
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Search — mobile */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              id="mobile-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
              aria-label="Search AI tools"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
