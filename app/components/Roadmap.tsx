'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Calendar, Target, AlertCircle } from 'lucide-react';

const initialChecklist = {
  week1: {
    task1: false,
    task2: false,
    task3: false,
  },
  week2: {
    task1: false,
    task2: false,
    task3: false,
  },
  week3: {
    task1: false,
    task2: false,
    task3: false,
  },
  week4: {
    task1: false,
    task2: false,
    task3: false,
  },
};

const initialNotes = {
  week1: '',
  week2: '',
  week3: '',
  week4: '',
};

export default function Roadmap() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [notes, setNotes] = useState(initialNotes);
  const [isClient, setIsClient] = useState(false);

  // Load data from sessionStorage on mount
  useEffect(() => {
    setIsClient(true);
    
    try {
      const savedChecklist = sessionStorage.getItem('roadmap-checklist');
      const savedNotes = sessionStorage.getItem('roadmap-notes');
      
      if (savedChecklist) {
        setChecklist(JSON.parse(savedChecklist));
      }
      
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading roadmap data:', error);
    }
  }, []);

  // Save checklist to sessionStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      try {
        sessionStorage.setItem('roadmap-checklist', JSON.stringify(checklist));
      } catch (error) {
        console.error('Error saving checklist:', error);
      }
    }
  }, [checklist, isClient]);

  // Save notes to sessionStorage whenever they change
  useEffect(() => {
    if (isClient) {
      try {
        sessionStorage.setItem('roadmap-notes', JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes:', error);
      }
    }
  }, [notes, isClient]);

  const toggleTask = (week: string, task: string) => {
    setChecklist((prev) => ({
      ...prev,
      [week]: {
        ...prev[week as keyof typeof prev],
        [task]: !prev[week as keyof typeof prev][task as keyof typeof prev.week1],
      },
    }));
  };

  const updateNotes = (week: string, value: string) => {
    setNotes((prev) => ({
      ...prev,
      [week]: value,
    }));
  };

  const weeks = [
    {
      id: 'week1',
      title: 'Week 1: AUDIT',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50',
      tasks: [
        { id: 'task1', text: 'List your top 10 time-consuming tasks' },
        { id: 'task2', text: 'Apply the 3 Criteria Test (Repetitive, Rule-based, Time-consuming)' },
        { id: 'task3', text: 'Select your pilot automation (start with ONE)' },
      ],
      placeholder: 'My pilot automation will be...',
    },
    {
      id: 'week2',
      title: 'Week 2: BUILD',
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      tasks: [
        { id: 'task1', text: 'Create your first automated workflow' },
        { id: 'task2', text: 'Document the process (prompts, tools, steps)' },
        { id: 'task3', text: 'Measure baseline metrics (time before vs after)' },
      ],
      placeholder: 'Tools I used / Time saved...',
    },
    {
      id: 'week3',
      title: 'Week 3: REFINE',
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      tasks: [
        { id: 'task1', text: 'Optimize based on Week 2 results' },
        { id: 'task2', text: 'Train others if applicable (share your workflow)' },
        { id: 'task3', text: 'Identify workflow #2 to automate' },
      ],
      placeholder: 'What I learned / Next automation...',
    },
    {
      id: 'week4',
      title: 'Week 4: SCALE',
      color: 'border-orange-500',
      bgColor: 'bg-orange-50',
      tasks: [
        { id: 'task1', text: 'Implement second automation' },
        { id: 'task2', text: 'Calculate cumulative ROI (total time saved)' },
        { id: 'task3', text: 'Plan your next quarter automation priorities' },
      ],
      placeholder: 'Total time saved / Next quarter goals...',
    },
  ];

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setChecklist(initialChecklist);
      setNotes(initialNotes);
      sessionStorage.removeItem('roadmap-checklist');
      sessionStorage.removeItem('roadmap-notes');
    }
  };

  return (
    <section id="roadmap" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Your 30-Day AI Automation Roadmap
            </h1>
          </div>
          <p className="text-lg text-slate-600 mb-4">Track your progress from audit to scaled automation</p>
          
          {/* Session Warning */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto text-left">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Your progress is saved in this browser session only. It will be lost when you close the browser or clear your session data.
            </p>
          </div>
        </div>

        {/* Weeks */}
        <div className="space-y-6">
          {weeks.map((week) => (
            <div
              key={week.id}
              className={`bg-white rounded-xl shadow-lg border-l-4 ${week.color} overflow-hidden`}
            >
              <div className={`${week.bgColor} px-6 py-4 border-b border-slate-200`}>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{week.title}</h2>
              </div>

              <div className="p-6">
                {/* Tasks */}
                <div className="space-y-3 mb-4">
                  {week.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(week.id, task.id)}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      {checklist[week.id as keyof typeof checklist][
                        task.id as keyof typeof checklist.week1
                      ] ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-slate-700 ${
                          checklist[week.id as keyof typeof checklist][
                            task.id as keyof typeof checklist.week1
                          ]
                            ? 'line-through text-slate-400'
                            : ''
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Notes and Reflections:
                  </label>
                  <textarea
                    value={notes[week.id as keyof typeof notes]}
                    onChange={(e) => updateNotes(week.id, e.target.value)}
                    placeholder={week.placeholder}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-slate-400"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6" />
            <h3 className="text-xl font-bold">Success Metrics to Track</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-1">Time Saved</div>
              <div className="text-green-100">Hours per week freed up</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Quality Improvement</div>
              <div className="text-green-100">Better outputs, fewer errors</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Tasks Automated</div>
              <div className="text-green-100">Number of workflows running</div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6 text-center">
          <button
            onClick={resetProgress}
            className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </section>
  );
}

