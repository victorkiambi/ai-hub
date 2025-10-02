'use client';

import { useState } from 'react';
import {
  Sparkles,
  PenTool,
  Search,
  MessageSquare,
  Database,
  Palette,
  Code,
  Mic,
  Zap,
  Video,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  DollarSign,
} from 'lucide-react';
import { tools, categories } from '@/lib/data/tools';

const categoryIcons = {
  sparkles: Sparkles,
  'pen-tool': PenTool,
  search: Search,
  'message-square': MessageSquare,
  database: Database,
  palette: Palette,
  code: Code,
  mic: Mic,
  zap: Zap,
  video: Video,
};

export default function ToolsGuide() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState<boolean>(false);

  const filteredTools = tools.filter((tool) => {
    const categoryMatch = selectedCategory === 'all' || tool.category === selectedCategory;
    const freeMatch = !showFreeOnly || tool.pricing.toLowerCase().includes('free');
    return categoryMatch && freeMatch;
  });

  const toggleTool = (id: string) => {
    setExpandedTool(expandedTool === id ? null : id);
  };



  return (
    <section id="tools-guide" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI Tools Recommendation Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare 15+ AI tools across 8 categories. Find the right tool for your specific needs
            with honest pros, cons, and pricing.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          {/* Free Only Toggle */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                showFreeOnly
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
              }`}
            >
              <DollarSign size={18} />
              <span>{showFreeOnly ? 'Showing Free Tools Only' : 'Show Free Tools Only'}</span>
              {showFreeOnly && <span className="ml-1">✓</span>}
            </button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setExpandedTool(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              <Sparkles size={18} />
              <span>All Tools</span>
            </button>

            {categories.map((category) => {
              const Icon = categoryIcons[category.icon as keyof typeof categoryIcons] || Sparkles;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setExpandedTool(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Icon size={18} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        {filteredTools.length > 0 ? (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Showing {filteredTools.length} {showFreeOnly && 'free '}
              {selectedCategory !== 'all' && `${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} `}
              tool{filteredTools.length !== 1 ? 's' : ''}
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">No tools found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}

        {/* Tools Grid */}
        <div className="space-y-4">
          {filteredTools.map((tool) => {
            const isExpanded = expandedTool === tool.id;
            const categoryInfo = categories.find((cat) => cat.id === tool.category);
            const CategoryIcon = categoryInfo
              ? categoryIcons[categoryInfo.icon as keyof typeof categoryIcons]
              : Sparkles;

            return (
              <div
                key={tool.id}
                className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white hover:border-blue-300 transition-colors"
              >
                {/* Tool Header */}
                <button
                  onClick={() => toggleTool(tool.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1 text-left">
                    <div className="p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <CategoryIcon className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {categoryInfo?.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{tool.type}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign size={16} />
                          <span>{tool.pricing}</span>
                        </div>
                        <div className="text-gray-600">
                          <span className="font-semibold">Best for:</span> {tool.bestFor}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-600 ml-4">
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {/* Tool Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-6 border-t border-gray-200 pt-6">
                    {/* Strengths */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Check className="text-green-600" size={20} />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {tool.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Limitations */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <X className="text-red-600" size={20} />
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {tool.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                            <span className="text-gray-700">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* When to Use */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-gray-900 mb-2">When to Use:</h4>
                      <p className="text-gray-700">{tool.useWhen}</p>
                    </div>

                    {/* Pricing Details */}
                    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
                      <DollarSign className="text-gray-600" size={20} />
                      <div>
                        <p className="font-semibold text-gray-900">Pricing:</p>
                        <p className="text-gray-700">{tool.pricing}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Comparison Table */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Comparison Chart
          </h3>
          
          {/* Table Filter Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                showFreeOnly
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
              }`}
            >
              <DollarSign size={18} />
              <span>{showFreeOnly ? 'Showing Free Tools' : 'Filter: Free Tools Only'}</span>
              {showFreeOnly && <span className="ml-1">✓</span>}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Tool</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Best For</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">Pricing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTools.map((tool) => {
                  const categoryInfo = categories.find((cat) => cat.id === tool.category);
                  return (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">{tool.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {categoryInfo?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{tool.bestFor}</td>
                      <td className="px-6 py-4 text-gray-700">{tool.pricing}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="mt-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <h4 className="font-bold text-yellow-900 mb-3">💡 Tool Selection Tips</h4>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• Start with free tiers to test before committing</li>
            <li>• Consider your existing tech stack and integrations</li>
            <li>• Evaluate based on your specific use case, not general hype</li>
            <li>• Factor in learning curve and team adoption time</li>
            <li>• Check for data privacy and security compliance</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

