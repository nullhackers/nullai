import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <IoSunnyOutline className="w-5 h-5 text-amber-400" />
      ) : (
        <IoMoonOutline className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
