'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, FolderTree, Wrench, TrendingUp } from 'lucide-react';

const frameworkLayers = [
  {
    id: 1,
    title: 'Identify',
    icon: Search,
    color: 'blue',
    tagline: 'Find the opportunities',
    description:
      'Start by mapping your current workflows and identifying repetitive, time-consuming tasks that can be automated with AI.',
    keyPoints: [
      'List all repetitive tasks in your daily workflow',
      'Track time spent on each task (use time-tracking for a week)',
      'Identify tasks with clear inputs and outputs',
      'Look for tasks that require research, writing, or data processing',
      'Prioritize high-frequency, high-time-cost activities',
    ],
    examples: [
      'Email responses and follow-ups',
      'Data entry and formatting',
      'Research and information gathering',
      'Report generation',
      'Meeting summaries and notes',
    ],
  },
  {
    id: 2,
    title: 'Categorize',
    icon: FolderTree,
    color: 'green',
    tagline: 'Organize by potential',
    description:
      'Evaluate each task based on automation potential, complexity, and ROI. Not everything should be automated.',
    keyPoints: [
      'Assess automation feasibility (Can AI handle this?)',
      'Estimate time savings per task',
      'Consider implementation complexity',
      'Calculate potential ROI (time saved × hourly rate)',
      'Rank tasks by impact and ease',
    ],
    categories: [
      { name: 'Quick Wins', desc: 'High impact, easy to implement' },
      { name: 'Strategic Projects', desc: 'High impact, complex implementation' },
      { name: 'Low Priority', desc: 'Low impact, but easy to automate' },
      { name: 'Not Worth It', desc: 'Low impact and/or too complex' },
    ],
  },
  {
    id: 3,
    title: 'Implement',
    icon: Wrench,
    color: 'purple',
    tagline: 'Build and test',
    description:
      'Start with quick wins, build proof of concept, and iterate. Focus on one automation at a time.',
    keyPoints: [
      'Start with the highest-ranked "Quick Win"',
      'Choose the right AI tool for the task',
      'Create and test prompts (iterate until reliable)',
      'Document the process and best practices',
      'Train team members on the new workflow',
    ],
    implementationSteps: [
      '1. Select one task from your Quick Wins category',
      '2. Choose the appropriate AI tool (ChatGPT, Claude, Perplexity, etc.)',
      '3. Craft and refine your prompt',
      '4. Test with real examples (minimum 10 test cases)',
      '5. Measure time saved and quality',
      '6. Roll out to team with documentation',
    ],
  },
  {
    id: 4,
    title: 'Optimize',
    icon: TrendingUp,
    color: 'orange',
    tagline: 'Measure and improve',
    description:
      'Track results, gather feedback, and continuously refine your automations. Measure ROI and scale what works.',
    keyPoints: [
      'Track time saved per automation (weekly/monthly)',
      'Gather user feedback on quality and usability',
      'Refine prompts based on real-world results',
      'Calculate actual ROI vs. projected ROI',
      'Identify next automation opportunities from learnings',
    ],
    metrics: [
      'Time saved per task (before vs. after)',
      'Weekly/monthly hours saved',
      'Cost savings (hours saved × hourly rate)',
      'User adoption rate',
      'Quality/accuracy of AI outputs',
      'Number of automations implemented',
    ],
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    hoverBg: 'hover:bg-blue-100',
    icon: 'text-blue-500',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    hoverBg: 'hover:bg-green-100',
    icon: 'text-green-500',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    hoverBg: 'hover:bg-purple-100',
    icon: 'text-purple-500',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    hoverBg: 'hover:bg-orange-100',
    icon: 'text-orange-500',
  },
};

export default function Framework() {
  const [expandedLayers, setExpandedLayers] = useState<number[]>([1]);

  const toggleLayer = (id: number) => {
    setExpandedLayers((prev) =>
      prev.includes(id) ? prev.filter((layerId) => layerId !== id) : [...prev, id]
    );
  };

  return (
    <section id="framework" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The 4-Layer AI Automation Framework
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A proven, systematic approach to implementing AI automation in your business. Follow
            these four layers to maximize ROI and minimize risk.
          </p>
        </div>

        {/* ROI Formula */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 sm:p-8 mb-12 text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center">The ROI Formula</h3>
          <div className="text-center">
            <p className="text-lg sm:text-xl font-mono mb-2">
              ROI = (Time Saved × Hourly Rate) - Implementation Cost
            </p>
            <p className="text-sm sm:text-base opacity-90">
              Focus on automations that save the most time with minimal implementation effort
            </p>
          </div>
        </div>

        {/* Framework Layers */}
        <div className="space-y-4">
          {frameworkLayers.map((layer) => {
            const Icon = layer.icon;
            const isExpanded = expandedLayers.includes(layer.id);
            const colors = colorClasses[layer.color as keyof typeof colorClasses];

            return (
              <div
                key={layer.id}
                className={`border-2 rounded-xl overflow-hidden transition-all ${colors.border} ${
                  isExpanded ? colors.bg : 'bg-white'
                }`}
              >
                {/* Layer Header - Always Visible */}
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-4 sm:p-6 transition-colors ${
                    isExpanded ? '' : colors.hoverBg
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-white ${colors.border} border-2`}>
                      <Icon size={28} className={colors.icon} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl sm:text-2xl font-bold ${colors.text}`}>
                        Layer {layer.id}: {layer.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{layer.tagline}</p>
                    </div>
                  </div>
                  <div className={colors.text}>
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {/* Layer Content - Expandable */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 space-y-6">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      {layer.description}
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Key Points:</h4>
                      <ul className="space-y-2">
                        {layer.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${colors.bg} ${colors.border} border-2`} />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {layer.examples && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Examples:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {layer.examples.map((example, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <span className="text-sm text-gray-700">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {layer.categories && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Priority Categories:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {layer.categories.map((category, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg border-2 border-gray-200">
                              <p className="font-semibold text-gray-900 mb-1">{category.name}</p>
                              <p className="text-sm text-gray-600">{category.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {layer.implementationSteps && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Implementation Steps:</h4>
                        <div className="space-y-2">
                          {layer.implementationSteps.map((step, index) => (
                            <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                              <p className="text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {layer.metrics && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Key Metrics to Track:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {layer.metrics.map((metric, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <span className="text-sm text-gray-700">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to calculate your potential savings?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('roi-calculator');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try the ROI Calculator →
          </button>
        </div>
      </div>
    </section>
  );
}

