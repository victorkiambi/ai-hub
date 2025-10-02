'use client';

import { useState } from 'react';
import { Plus, Trash2, DollarSign, Clock, TrendingUp, Briefcase } from 'lucide-react';

interface Automation {
  id: string;
  taskName: string;
  timeBefore: number;
  timeAfter: number;
  frequencyPerWeek: number;
}

export default function ROICalculator() {
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [automations, setAutomations] = useState<Automation[]>([
    { id: '1', taskName: '', timeBefore: 0, timeAfter: 0, frequencyPerWeek: 0 },
  ]);

  const addAutomation = () => {
    if (automations.length < 10) {
      setAutomations([
        ...automations,
        {
          id: Date.now().toString(),
          taskName: '',
          timeBefore: 0,
          timeAfter: 0,
          frequencyPerWeek: 0,
        },
      ]);
    }
  };

  const removeAutomation = (id: string) => {
    if (automations.length > 1) {
      setAutomations(automations.filter((auto) => auto.id !== id));
    }
  };

  const updateAutomation = (id: string, field: keyof Automation, value: string | number) => {
    setAutomations(
      automations.map((auto) => (auto.id === id ? { ...auto, [field]: value } : auto))
    );
  };

  // Calculate savings for each automation
  const calculateAutomationSavings = (automation: Automation) => {
    const timeSavedPerTask = (automation.timeBefore - automation.timeAfter) / 60; // Convert to hours
    const weeklyHoursSaved = timeSavedPerTask * automation.frequencyPerWeek;
    const weeklyDollarsSaved = weeklyHoursSaved * hourlyRate;
    return {
      weeklyHours: weeklyHoursSaved,
      weeklyDollars: weeklyDollarsSaved,
    };
  };

  // Calculate total savings
  const calculateTotalSavings = () => {
    const totals = automations.reduce(
      (acc, auto) => {
        const savings = calculateAutomationSavings(auto);
        return {
          weeklyHours: acc.weeklyHours + savings.weeklyHours,
          weeklyDollars: acc.weeklyDollars + savings.weeklyDollars,
        };
      },
      { weeklyHours: 0, weeklyDollars: 0 }
    );

    const monthlyHours = totals.weeklyHours * 4.33;
    const monthlyDollars = totals.weeklyDollars * 4.33;
    const yearlyHours = totals.weeklyHours * 52;
    const yearlyDollars = totals.weeklyDollars * 52;
    const workWeeksSaved = yearlyHours / 40;
    const ftePercentage = (yearlyHours / 2080) * 100;

    return {
      weekly: { hours: totals.weeklyHours, dollars: totals.weeklyDollars },
      monthly: { hours: monthlyHours, dollars: monthlyDollars },
      yearly: { hours: yearlyHours, dollars: yearlyDollars },
      workWeeks: workWeeksSaved,
      ftePercentage: ftePercentage,
    };
  };

  const resetCalculator = () => {
    if (confirm('Are you sure you want to reset the calculator?')) {
      setHourlyRate(50);
      setAutomations([{ id: '1', taskName: '', timeBefore: 0, timeAfter: 0, frequencyPerWeek: 0 }]);
    }
  };

  const totals = calculateTotalSavings();

  return (
    <section id="roi-calculator" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI Automation ROI Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the time and cost savings from your AI automations. Add up to 10 different
            tasks to see your total ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hourly Rate */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <label className="block mb-3">
                <span className="text-lg font-bold text-gray-900">Your Hourly Rate ($)</span>
                <div className="mt-2 relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-900 placeholder:text-gray-400"
                    placeholder="50"
                  />
                </div>
              </label>
            </div>

            {/* Automations */}
            <div className="space-y-4">
              {automations.map((automation, index) => (
                <div
                  key={automation.id}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Automation #{index + 1}
                    </h3>
                    {automations.length > 1 && (
                      <button
                        onClick={() => removeAutomation(automation.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove automation"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Task Name
                      </label>
                      <input
                        type="text"
                        value={automation.taskName}
                        onChange={(e) =>
                          updateAutomation(automation.id, 'taskName', e.target.value)
                        }
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                        placeholder="e.g., Email responses"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Before AI (minutes)
                      </label>
                      <input
                        type="number"
                        value={automation.timeBefore || ''}
                        onChange={(e) =>
                          updateAutomation(automation.id, 'timeBefore', Number(e.target.value))
                        }
                        min="0"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time After AI (minutes)
                      </label>
                      <input
                        type="number"
                        value={automation.timeAfter || ''}
                        onChange={(e) =>
                          updateAutomation(automation.id, 'timeAfter', Number(e.target.value))
                        }
                        min="0"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                        placeholder="5"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frequency per Week
                      </label>
                      <input
                        type="number"
                        value={automation.frequencyPerWeek || ''}
                        onChange={(e) =>
                          updateAutomation(
                            automation.id,
                            'frequencyPerWeek',
                            Number(e.target.value)
                          )
                        }
                        min="0"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  {/* Individual Automation Savings */}
                  {automation.taskName &&
                    automation.timeBefore > 0 &&
                    automation.frequencyPerWeek > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <span className="font-semibold">Savings:</span>{' '}
                          {calculateAutomationSavings(automation).weeklyHours.toFixed(1)} hours/week
                          = ${calculateAutomationSavings(automation).weeklyDollars.toFixed(0)}/week
                        </p>
                      </div>
                    )}
                </div>
              ))}

              {/* Add Automation Button */}
              {automations.length < 10 && (
                <button
                  onClick={addAutomation}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Plus size={20} />
                  <span>Add Another Automation (max 10)</span>
                </button>
              )}
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetCalculator}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Reset Calculator
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-6">Your ROI Summary</h3>

                <div className="space-y-4">
                  {/* Weekly */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={20} />
                      <h4 className="font-semibold">Weekly Savings</h4>
                    </div>
                    <p className="text-2xl font-bold">{totals.weekly.hours.toFixed(1)} hours</p>
                    <p className="text-lg">${totals.weekly.dollars.toFixed(0)}</p>
                  </div>

                  {/* Monthly */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={20} />
                      <h4 className="font-semibold">Monthly Savings</h4>
                    </div>
                    <p className="text-2xl font-bold">{totals.monthly.hours.toFixed(0)} hours</p>
                    <p className="text-lg">${totals.monthly.dollars.toFixed(0)}</p>
                  </div>

                  {/* Yearly */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={20} />
                      <h4 className="font-semibold">Yearly Savings</h4>
                    </div>
                    <p className="text-2xl font-bold">{totals.yearly.hours.toFixed(0)} hours</p>
                    <p className="text-lg">${totals.yearly.dollars.toFixed(0)}</p>
                  </div>

                  {/* Context */}
                  {totals.yearly.hours > 0 && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase size={20} />
                        <h4 className="font-semibold">That&apos;s equivalent to:</h4>
                      </div>
                      <p className="text-lg">
                        {totals.workWeeks.toFixed(1)} work weeks
                      </p>
                      <p className="text-lg">
                        {totals.ftePercentage.toFixed(1)}% of an FTE
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <h4 className="font-bold text-yellow-900 mb-3">💡 Tips for Accuracy</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Track actual time for one week before estimating</li>
                  <li>• Include setup and review time in &quot;After AI&quot; duration</li>
                  <li>• Be conservative with time savings estimates</li>
                  <li>• Consider training time in your calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

