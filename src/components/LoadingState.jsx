const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="status" aria-label="Loading">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-800" />
        <div className="absolute inset-0 rounded-full border-2 border-t-indigo-600 dark:border-t-indigo-400 animate-spin" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading AI tools...</p>
    </div>
  );
};

export default LoadingState;
