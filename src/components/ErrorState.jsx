import { IoWarningOutline } from 'react-icons/io5';

const ErrorState = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="alert">
      <div className="w-12 h-12 mb-4 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
        <IoWarningOutline className="w-6 h-6 text-red-500 dark:text-red-400" />
      </div>
      <p className="text-base font-medium text-gray-900 dark:text-white mb-1">Unable to load AI tools</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Please check your connection and try again.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
          aria-label="Retry loading tools"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
