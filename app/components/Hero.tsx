'use client';

import {
  Layers,
  MapIcon,
  BookOpen,
  Calculator,
  Wrench,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

const resourceCards = [
  {
    id: 'framework',
    title: 'The Framework',
    description: '4-layer approach to AI automation',
    icon: Layers,
    color: 'blue',
  },
  {
    id: 'roadmap',
    title: 'Implementation Roadmap',
    description: '30-day plan to implement AI',
    icon: MapIcon,
    color: 'green',
  },
  {
    id: 'use-cases',
    title: 'Use Case Library',
    description: '18 industry-specific examples',
    icon: BookOpen,
    color: 'purple',
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Calculate your time & cost savings',
    icon: Calculator,
    color: 'orange',
  },
  {
    id: 'tools-guide',
    title: 'Tools Guide',
    description: '15+ AI tools compared',
    icon: Wrench,
    color: 'indigo',
  },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
  green: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
  indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200',
};

export default function Hero() {
  const handleCardClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-600" size={32} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              AI Automation Resource Hub
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Everything you need to implement AI automation in your business—framework, examples,
            calculators, and roadmap—in one accessible place.
          </p>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            This hub accompanies the AI automation training session. Navigate to any resource
            below or use the menu above.
          </p>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <TrendingUp className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Save Time</p>
              <p className="text-sm text-gray-600">Automate repetitive tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <Zap className="text-orange-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Boost Productivity</p>
              <p className="text-sm text-gray-600">Focus on high-value work</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <Calculator className="text-purple-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Measure ROI</p>
              <p className="text-sm text-gray-600">Track your savings</p>
            </div>
          </div>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resourceCards.map((card) => {
            const Icon = card.icon;
            const colorClass = colorClasses[card.color as keyof typeof colorClasses];
            
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-lg text-left ${colorClass}`}
              >
                <Icon size={32} className="mb-4" />
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm opacity-90">{card.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

