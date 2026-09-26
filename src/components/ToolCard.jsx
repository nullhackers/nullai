import { FaExternalLinkAlt } from 'react-icons/fa';
import {
  IoVideocamOutline,
  IoImageOutline,
  IoTimeOutline,
  IoKeyOutline,
  IoSparklesOutline,
  IoResizeOutline,
  IoWarningOutline,
} from 'react-icons/io5';

const ToolCard = ({ tool, onSelect }) => {
  const { name, category, description, access, generation, features, notes } = tool;

  return (
    <article
      className="group relative flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(tool)}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(tool); } }}
      role="button"
      aria-label={`View details for ${name}`}
    >
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {name}
            </h3>
            <span className="inline-block mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
              {category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Metadata grid */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Login method */}
          {access?.loginRequired === false && (
            <MetaBadge icon={<IoKeyOutline />} text="No login required" />
          )}
          {access?.loginMethod && (
            <MetaBadge icon={<IoKeyOutline />} text={`${access.loginMethod} Login`} />
          )}

          {/* Credits */}
          {access?.credits && (
            <MetaBadge icon={<IoSparklesOutline />} text={access.credits} />
          )}

          {/* Generation types */}
          {generation?.type?.length > 0 && (
            <MetaBadge
              icon={generation.type.includes('Video') ? <IoVideocamOutline /> : <IoImageOutline />}
              text={generation.type.join(' + ')}
            />
          )}

          {/* Duration */}
          {generation?.durations?.length > 0 && (
            <MetaBadge icon={<IoTimeOutline />} text={generation.durations.join(' / ')} />
          )}

          {/* Resolution */}
          {generation?.resolution && (
            <MetaBadge icon={<IoResizeOutline />} text={generation.resolution} />
          )}

          {/* Aspect ratio */}
          {generation?.aspectRatio && (
            <MetaBadge icon={<IoResizeOutline />} text={generation.aspectRatio} />
          )}
        </div>

        {/* Features */}
        {features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {features.map((feature, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="flex items-start gap-1.5 mb-4 text-xs text-amber-700 dark:text-amber-400">
            <IoWarningOutline className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>{notes}</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-200"
          aria-label={`Visit ${name} website`}
        >
          Visit Website
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
};

const MetaBadge = ({ icon, text }) => (
  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
    <span className="w-3.5 h-3.5 flex-shrink-0">{icon}</span>
    {text}
  </span>
);

export default ToolCard;
