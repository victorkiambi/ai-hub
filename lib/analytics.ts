import { track } from '@vercel/analytics';

export const analytics = {
  // ROI Calculator events
  roiCalculator: {
    calculate: (data: {
      taskName: string;
      frequency: number;
      beforeDuration: number;
      afterDuration: number;
      hourlyRate: number;
    }) => {
      track('roi_calculate', {
        task_name: data.taskName,
        frequency: data.frequency,
        before_duration: data.beforeDuration,
        after_duration: data.afterDuration,
        hourly_rate: data.hourlyRate,
        time_saved: data.beforeDuration - data.afterDuration,
        savings_percentage: ((data.beforeDuration - data.afterDuration) / data.beforeDuration * 100).toFixed(1)
      });
    },
    addTask: () => {
      track('roi_add_task');
    },
    removeTask: (taskCount: number) => {
      track('roi_remove_task', { remaining_tasks: taskCount });
    }
  },

  // Tools Guide events
  toolsGuide: {
    filterByCategory: (category: string) => {
      track('tools_filter_category', { category });
    },
    toggleFreeOnly: (enabled: boolean) => {
      track('tools_filter_free', { free_only: enabled });
    },
    expandTool: (toolName: string, category: string) => {
      track('tools_expand', { tool_name: toolName, category });
    }
  },

  // Use Case Library events
  useCaseLibrary: {
    filterByIndustry: (industry: string) => {
      track('usecases_filter_industry', { industry });
    },
    expandUseCase: (useCaseName: string, industry: string) => {
      track('usecases_expand', { use_case: useCaseName, industry });
    },
    copyPrompt: (useCaseName: string, industry: string) => {
      track('usecases_copy_prompt', { use_case: useCaseName, industry });
    }
  },

  // Navigation events
  navigation: {
    scrollToSection: (section: string) => {
      track('navigation_scroll', { section });
    },
    downloadGuide: () => {
      track('download_guide');
    }
  },

  // Engagement events
  engagement: {
    timeOnPage: (section: string, timeInSeconds: number) => {
      track('time_on_section', { section, time_seconds: timeInSeconds });
    },
    scrollDepth: (depth: number) => {
      track('scroll_depth', { depth_percentage: depth });
    }
  }
};
