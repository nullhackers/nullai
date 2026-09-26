import ToolCard from './ToolCard';

const ToolGrid = ({ tools, onSelectTool }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
      ))}
    </div>
  );
};

export default ToolGrid;
