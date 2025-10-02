'use client';

import { useState } from 'react';
import {
  Briefcase,
  Megaphone,
  DollarSign,
  Settings,
  Rocket,
  Users,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Clock,
  Wrench,
} from 'lucide-react';
import { useCases, industries } from '@/lib/data/useCases';
import { analytics } from '@/lib/analytics';

const industryIcons = {
  briefcase: Briefcase,
  megaphone: Megaphone,
  'dollar-sign': DollarSign,
  settings: Settings,
  rocket: Rocket,
  users: Users,
};

export default function UseCaseLibrary() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('sales');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const filteredCases = useCases.filter((useCase) => useCase.industry === selectedIndustry);

  const copyToClipboard = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(id);
      setTimeout(() => setCopiedPrompt(null), 2000);
      
      // Track copy event
      const useCase = useCases.find(uc => uc.id === id);
      if (useCase) {
        analytics.useCaseLibrary.copyPrompt(useCase.task, useCase.industry);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleCase = (id: string) => {
    const useCase = useCases.find(uc => uc.id === id);
    if (useCase && expandedCase !== id) {
      analytics.useCaseLibrary.expandUseCase(useCase.task, useCase.industry);
    }
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <section id="use-cases" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Industry-Specific Use Case Library
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            18 real-world examples of AI automation across 6 industries. Each includes proven
            prompts you can copy and use immediately.
          </p>
        </div>

        {/* Industry Filter */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {industries.map((industry) => {
              const Icon =
                industryIcons[industry.icon as keyof typeof industryIcons] || Briefcase;
              const isSelected = selectedIndustry === industry.id;

              return (
                <button
                  key={industry.id}
                  onClick={() => {
                    analytics.useCaseLibrary.filterByIndustry(industry.id);
                    setSelectedIndustry(industry.id);
                    setExpandedCase(null);
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Icon size={28} />
                  <span className="text-sm font-semibold">{industry.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Use Cases */}
        <div className="space-y-4">
          {filteredCases.map((useCase) => {
            const isExpanded = expandedCase === useCase.id;
            const isCopied = copiedPrompt === useCase.id;

            return (
              <div
                key={useCase.id}
                className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white hover:border-blue-300 transition-colors"
              >
                {/* Use Case Header */}
                <button
                  onClick={() => toggleCase(useCase.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.task}</h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span>Saves: {useCase.timeSaved}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Wrench size={16} />
                        <span>{useCase.tools}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-600 ml-4">
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {/* Use Case Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-6 border-t border-gray-200 pt-6">
                    {/* Before/After Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-900 mb-2">⏰ Before AI:</h4>
                        <p className="text-sm text-red-800">{useCase.before}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-900 mb-2">✨ After AI:</h4>
                        <p className="text-sm text-green-800">{useCase.after}</p>
                      </div>
                    </div>

                    {/* Recommended Tools */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Recommended Tools:</h4>
                      <p className="text-gray-700">{useCase.tools}</p>
                    </div>

                    {/* Sample Prompt */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900">Sample Prompt:</h4>
                        <button
                          onClick={() => copyToClipboard(useCase.prompt, useCase.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isCopied
                              ? 'bg-green-600 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check size={18} />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={18} />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm whitespace-pre-wrap">
                        {useCase.prompt}
                      </div>
                    </div>

                    {/* Time Saved Highlight */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-600" size={20} />
                        <p className="text-blue-900">
                          <span className="font-bold">Time Saved:</span> {useCase.timeSaved}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <p className="text-gray-700 mb-4">
            Want to calculate the exact savings for your business?
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

