import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoCloseOutline, IoWarningOutline } from 'react-icons/io5';

const ToolDetails = ({ tool, onClose }) => {
  if (!tool) return null;

  const { name, category, description, access, generation, features, notes, website, lastUpdated } = tool;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${name}`}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-gray-200 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 z-10"
          aria-label="Close details"
        >
          <IoCloseOutline className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-5 pr-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h2>
            <span className="inline-block mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md">
              {category}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {description}
          </p>

          {/* Access section */}
          {access && (access.loginRequired !== undefined || access.credits) && (
            <DetailSection title="Access">
              <div className="space-y-2">
                {access.loginRequired === false && (
                  <DetailRow label="Login" value="Not required" />
                )}
                {access.loginMethod && (
                  <DetailRow label="Login" value={`${access.loginMethod}`} />
                )}
                {access.credits && (
                  <DetailRow label="Credits" value={access.credits} />
                )}
              </div>
            </DetailSection>
          )}

          {/* Generation section */}
          {generation && (generation.type?.length > 0 || generation.durations?.length > 0 || generation.resolution || generation.aspectRatio) && (
            <DetailSection title="Generation">
              <div className="space-y-2">
                {generation.type?.length > 0 && (
                  <DetailRow label="Type" value={generation.type.join(', ')} />
                )}
                {generation.durations?.length > 0 && (
                  <DetailRow label="Duration" value={generation.durations.join(', ')} />
                )}
                {generation.resolution && (
                  <DetailRow label="Resolution" value={generation.resolution} />
                )}
                {generation.aspectRatio && (
                  <DetailRow label="Aspect Ratio" value={generation.aspectRatio} />
                )}
              </div>
            </DetailSection>
          )}

          {/* Features section */}
          {features?.length > 0 && (
            <DetailSection title="Features">
              <div className="flex flex-wrap gap-2">
                {features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </DetailSection>
          )}

          {/* Notes */}
          {notes && (
            <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900">
              <IoWarningOutline className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">{notes}</p>
            </div>
          )}

          {/* Last updated */}
          {lastUpdated && (
            <p className="text-xs text-gray-400 dark:text-gray-600 mb-5">
              Last updated: {lastUpdated}
            </p>
          )}

          {/* Visit button */}
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors duration-200"
            aria-label={`Visit ${name} website`}
          >
            Visit Website
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

const DetailSection = ({ title, children }) => (
  <div className="mb-5">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{title}</h3>
    {children}
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
  </div>
);

export default ToolDetails;
