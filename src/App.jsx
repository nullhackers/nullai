import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ToolGrid from './components/ToolGrid';
import ToolDetails from './components/ToolDetails';
import SortSelect from './components/SortSelect';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://nullaidb.onrender.com';

function App() {
  const { theme, toggleTheme } = useTheme();

  // Data state
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  // Detail modal
  const [selectedTool, setSelectedTool] = useState(null);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [toolsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/tools`),
        axios.get(`${API_BASE_URL}/categories`),
      ]);
      setTools(toolsRes.data);
      setCategories(categoriesRes.data.map((c) => c.name));
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedTool(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = [...tools];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((tool) => tool.category === activeCategory);
    }

    // Search filter — case-insensitive across multiple fields
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((tool) => {
        const searchableFields = [
          tool.name,
          tool.description,
          tool.category,
          tool.access?.loginMethod,
          tool.access?.credits,
          tool.generation?.resolution,
          tool.generation?.aspectRatio,
          tool.notes,
          ...(tool.features || []),
          ...(tool.generation?.type || []),
          ...(tool.generation?.durations || []),
        ];
        return searchableFields.some(
          (field) => field && String(field).toLowerCase().includes(query)
        );
      });
    }

    // Sort
    if (sortOption === 'a-z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'z-a') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [tools, activeCategory, searchQuery, sortOption]);

  // Dynamic categories from data (union of API categories + categories found in tools)
  const dynamicCategories = useMemo(() => {
    const fromTools = [...new Set(tools.map((t) => t.category))];
    const merged = [...new Set([...categories, ...fromTools])];
    return merged;
  }, [tools, categories]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          toolCount={tools.length}
        />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState onRetry={fetchData} />
          ) : (
            <>
              {/* Category filters */}
              <div className="mb-6">
                <CategoryFilter
                  categories={dynamicCategories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              {/* Toolbar: count + sort */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredTools.length === tools.length
                    ? `${filteredTools.length} AI ${filteredTools.length === 1 ? 'tool' : 'tools'}`
                    : `${filteredTools.length} ${filteredTools.length === 1 ? 'tool' : 'tools'} found`}
                </p>
                <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
              </div>

              {/* Grid or empty */}
              {filteredTools.length > 0 ? (
                <ToolGrid tools={filteredTools} onSelectTool={setSelectedTool} />
              ) : (
                <EmptyState
                  searchQuery={searchQuery}
                  activeCategory={activeCategory}
                  onClearSearch={() => setSearchQuery('')}
                  onClearCategory={() => setActiveCategory('All')}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center transition-colors duration-200">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          &copy; {new Date().getFullYear()} NullAI. All rights reserved.
        </p>
      </footer>

      {/* Detail Modal */}
      {selectedTool && (
        <ToolDetails tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
}

export default App;
