export interface UseCase {
  id: string;
  industry: string;
  task: string;
  before: string;
  after: string;
  timeSaved: string;
  tools: string;
  prompt: string;
}

export const industries = [
  { id: 'sales', label: 'Sales', icon: 'briefcase' },
  { id: 'marketing', label: 'Marketing', icon: 'megaphone' },
  { id: 'finance', label: 'Finance', icon: 'dollar-sign' },
  { id: 'operations', label: 'Operations', icon: 'settings' },
  { id: 'entrepreneurs', label: 'Entrepreneurs', icon: 'rocket' },
  { id: 'hr', label: 'HR', icon: 'users' },
];

export const useCases: UseCase[] = [
  // Sales
  {
    id: 'sales-1',
    industry: 'sales',
    task: 'Lead Research & Qualification',
    before: '30-45 min per lead researching company, industry, pain points manually',
    after: 'AI gathers comprehensive info in 5 minutes with structured output',
    timeSaved: '25-40 min per lead',
    tools: 'ChatGPT, Claude, Perplexity',
    prompt: `Research [Company Name] and provide:
1. Company overview (industry, size, revenue if public)
2. Recent news and developments (last 6 months)
3. Key decision makers and their backgrounds
4. Likely pain points related to [your product/service]
5. Competitive landscape
6. Best approach and talking points for outreach`,
  },
  {
    id: 'sales-2',
    industry: 'sales',
    task: 'Personalized Email Outreach',
    before: '15-20 min per email crafting personalized outreach from scratch',
    after: 'AI generates personalized email in 2 minutes, you review and send',
    timeSaved: '13-18 min per email',
    tools: 'ChatGPT, Claude, Jasper',
    prompt: `Write a personalized sales outreach email with these details:
- Prospect: [Name, Title, Company]
- Our solution: [Brief description]
- Their pain point: [Identified challenge]
- Recent trigger: [News, funding, hiring, etc.]

Email should be:
- Conversational and authentic
- Reference specific trigger
- Clear value proposition
- Soft CTA (meeting request)
- Under 150 words`,
  },
  {
    id: 'sales-3',
    industry: 'sales',
    task: 'Meeting Summaries & Follow-ups',
    before: '20-30 min after each meeting to write summary and follow-up email',
    after: 'AI generates summary and follow-up from transcript in 3 minutes',
    timeSaved: '17-27 min per meeting',
    tools: 'Otter.ai, Fireflies, ChatGPT',
    prompt: `From this meeting transcript, create:
1. Executive summary (3-4 bullet points)
2. Key decisions made
3. Action items (who, what, when)
4. Follow-up email draft thanking attendees and confirming next steps

[Paste transcript]`,
  },

  // Marketing
  {
    id: 'marketing-1',
    industry: 'marketing',
    task: 'Social Media Content Calendar',
    before: '3-4 hours to plan and write a month of social posts',
    after: 'AI generates 30 days of content in 30 minutes, you review and refine',
    timeSaved: '2.5-3.5 hours per month',
    tools: 'ChatGPT, Claude, Copy.ai',
    prompt: `Create a 30-day social media content calendar for [Platform] with:
- Target audience: [Description]
- Brand voice: [Tone/personality]
- Topics: [List key themes]
- Mix: 40% educational, 30% engaging questions, 20% behind-the-scenes, 10% promotional

For each post provide:
1. Date
2. Hook/first line
3. Full caption
4. Relevant hashtags
5. Content type (carousel, video idea, static image)`,
  },
  {
    id: 'marketing-2',
    industry: 'marketing',
    task: 'Blog Post Outlining & Research',
    before: '45-60 min researching topic and creating detailed outline',
    after: 'AI delivers research and structured outline in 10 minutes',
    timeSaved: '35-50 min per article',
    tools: 'ChatGPT, Claude, Perplexity',
    prompt: `Create a comprehensive blog post outline for: "[Topic]"
Target audience: [Description]
Goal: [SEO, thought leadership, education, etc.]

Provide:
1. SEO-optimized title (3 options)
2. Meta description
3. Key points/sections with H2 headings
4. Supporting data and statistics
5. Expert quotes or case studies to include
6. Internal/external linking opportunities
7. Call-to-action suggestions`,
  },
  {
    id: 'marketing-3',
    industry: 'marketing',
    task: 'Ad Copy Variations',
    before: '30-45 min brainstorming and writing multiple ad variations',
    after: 'AI generates 10+ variations in 5 minutes for A/B testing',
    timeSaved: '25-40 min per campaign',
    tools: 'ChatGPT, Copy.ai, Jasper',
    prompt: `Generate 10 ad copy variations for:
- Platform: [Facebook/Google/LinkedIn]
- Product/Service: [Description]
- Target audience: [Demographics, pain points]
- Unique value prop: [What makes it different]
- Tone: [Professional/casual/urgent]

For each variation provide:
- Headline (attention-grabbing)
- Body copy (benefit-focused, 2-3 sentences)
- CTA (clear action)

Include mix of emotional and logical appeals.`,
  },

  // Finance
  {
    id: 'finance-1',
    industry: 'finance',
    task: 'Expense Report Categorization',
    before: '45-60 min manually categorizing and tagging 50+ expenses',
    after: 'AI categorizes and flags anomalies in 5 minutes',
    timeSaved: '40-55 min per report',
    tools: 'ChatGPT, Claude',
    prompt: `Categorize these expenses and identify any anomalies:
[Paste expense list with: Date, Vendor, Amount, Description]

Provide:
1. Each expense with assigned category
2. Flagged items that seem unusual or need review
3. Summary by category with totals
4. Recommendations for policy compliance`,
  },
  {
    id: 'finance-2',
    industry: 'finance',
    task: 'Financial Report Summaries',
    before: '60-90 min analyzing data and writing executive summary',
    after: 'AI generates summary with key insights in 15 minutes',
    timeSaved: '45-75 min per report',
    tools: 'ChatGPT, Claude',
    prompt: `Analyze this financial data and create an executive summary:
[Paste data: revenue, expenses, margins, trends]

Include:
1. Key highlights (3-4 bullets)
2. Trends and patterns
3. Variances from budget/forecast
4. Areas of concern
5. Recommendations
6. One-sentence takeaway for leadership

Make it accessible for non-finance stakeholders.`,
  },
  {
    id: 'finance-3',
    industry: 'finance',
    task: 'Invoice & Payment Follow-ups',
    before: '20-30 min drafting professional payment reminder emails',
    after: 'AI generates personalized reminders in 3 minutes',
    timeSaved: '17-27 min per batch',
    tools: 'ChatGPT, Claude',
    prompt: `Write payment reminder emails for these scenarios:

Scenario: [First reminder / 15 days overdue / 30 days overdue]
Client: [Name and relationship context]
Invoice: [Amount and date]
Previous communication: [Any relevant context]

Create email that is:
- Professional but friendly
- Clear about payment terms
- Helpful (offer payment plan if needed)
- Maintains relationship
- Includes next steps

Provide 3 tone variations: Gentle reminder, Firm but polite, Final notice.`,
  },

  // Operations
  {
    id: 'operations-1',
    industry: 'operations',
    task: 'SOP (Standard Operating Procedure) Documentation',
    before: '2-3 hours documenting a process step-by-step',
    after: 'AI creates structured SOP from brief description in 20 minutes',
    timeSaved: '1.5-2.5 hours per SOP',
    tools: 'ChatGPT, Claude',
    prompt: `Create a detailed SOP for: [Process Name]

I'll describe the process: [Brief description or bullet points of steps]

Format the SOP with:
1. Purpose and scope
2. Roles and responsibilities
3. Step-by-step procedures (numbered, detailed)
4. Tools/resources required
5. Common issues and troubleshooting
6. Quality checkpoints
7. Revision history section

Make it clear enough for a new team member to follow.`,
  },
  {
    id: 'operations-2',
    industry: 'operations',
    task: 'Meeting Minutes & Action Items',
    before: '30-40 min taking notes during meeting and formatting afterward',
    after: 'AI generates structured minutes from transcript in 5 minutes',
    timeSaved: '25-35 min per meeting',
    tools: 'Otter.ai, Fireflies, ChatGPT',
    prompt: `From this meeting transcript, create formal meeting minutes:

[Paste transcript or notes]

Structure:
1. Date, time, attendees
2. Agenda items discussed
3. Key decisions made
4. Action items (Person, Task, Due Date)
5. Open questions/parking lot
6. Next meeting date and agenda preview

Format professionally for distribution to stakeholders.`,
  },
  {
    id: 'operations-3',
    industry: 'operations',
    task: 'Vendor Comparison & Analysis',
    before: '2-4 hours researching vendors and creating comparison matrix',
    after: 'AI delivers structured comparison in 30 minutes',
    timeSaved: '1.5-3.5 hours per analysis',
    tools: 'ChatGPT, Perplexity',
    prompt: `Compare vendors for: [Product/Service Category]

Vendors to analyze: [List 3-5 vendors or ask AI to suggest]

Create comparison covering:
1. Feature matrix (side-by-side)
2. Pricing structure
3. Pros and cons for each
4. Best use cases
5. Integration capabilities
6. Customer reviews summary
7. Recommendation with justification

Consider our needs: [List requirements]`,
  },

  // Entrepreneurs
  {
    id: 'entrepreneurs-1',
    industry: 'entrepreneurs',
    task: 'Business Plan Creation',
    before: '8-12 hours researching and writing a business plan',
    after: 'AI creates comprehensive first draft in 1-2 hours, you refine',
    timeSaved: '6-10 hours per plan',
    tools: 'ChatGPT, Claude',
    prompt: `Create a comprehensive business plan for:
- Business: [Name and concept]
- Industry: [Sector]
- Target market: [Description]
- Unique value: [What sets it apart]

Include all standard sections:
1. Executive Summary
2. Business Description
3. Market Analysis
4. Organization & Management
5. Service/Product Line
6. Marketing & Sales Strategy
7. Financial Projections (3-year)
8. Funding Requirements
9. Appendix outline

Make it investor-ready with realistic projections and clear differentiation.`,
  },
  {
    id: 'entrepreneurs-2',
    industry: 'entrepreneurs',
    task: 'Investor Pitch Deck',
    before: '4-6 hours drafting pitch deck content and narrative',
    after: 'AI generates slide-by-slide content in 45 minutes',
    timeSaved: '3-5 hours per deck',
    tools: 'ChatGPT, Claude',
    prompt: `Create content for a 10-12 slide investor pitch deck:

Business: [Description]
Stage: [Seed/Series A/etc.]
Seeking: [$ Amount]

For each slide provide:
- Slide title
- Key points (bullets)
- Supporting narrative

Cover:
1. Problem
2. Solution
3. Market opportunity
4. Business model
5. Traction
6. Competition
7. Team
8. Financials
9. Ask
10. Vision

Keep content punchy, data-driven, compelling.`,
  },
  {
    id: 'entrepreneurs-3',
    industry: 'entrepreneurs',
    task: 'Market Research & Competitor Analysis',
    before: '6-8 hours manually researching market and competitors',
    after: 'AI delivers comprehensive research in 1 hour',
    timeSaved: '5-7 hours per analysis',
    tools: 'ChatGPT, Perplexity, Claude',
    prompt: `Conduct market research and competitor analysis for:
- Industry: [Specific sector]
- Geography: [Target regions]
- Our focus: [Product/service area]

Provide:
1. Market size and growth trends
2. Key market segments
3. Top 5 competitors (overview)
4. Competitive matrix (features, pricing, positioning)
5. Market gaps and opportunities
6. Barriers to entry
7. Customer pain points (from reviews/forums)
8. Recommended differentiation strategy

Include data sources and statistics where possible.`,
  },

  // HR
  {
    id: 'hr-1',
    industry: 'hr',
    task: 'Job Description Writing',
    before: '45-60 min writing comprehensive job description',
    after: 'AI generates complete, compelling JD in 10 minutes',
    timeSaved: '35-50 min per role',
    tools: 'ChatGPT, Claude',
    prompt: `Write a compelling job description for:
- Role: [Job Title]
- Level: [Junior/Mid/Senior]
- Department: [Team]
- Location: [Remote/Hybrid/Office]

Include:
1. Engaging role overview
2. Key responsibilities (5-7 bullets)
3. Required qualifications
4. Nice-to-have skills
5. What success looks like
6. Why join us (company sell)
7. Benefits highlights
8. DEI statement

Tone: Professional but welcoming. Focus on growth and impact.`,
  },
  {
    id: 'hr-2',
    industry: 'hr',
    task: 'Candidate Screening Summaries',
    before: '20-25 min per resume to review and write screening notes',
    after: 'AI summarizes qualifications and fit in 3 minutes',
    timeSaved: '17-22 min per candidate',
    tools: 'ChatGPT, Claude',
    prompt: `Review this resume for [Job Title] position and provide:

[Paste resume text]

Analysis:
1. Quick summary (2-3 sentences)
2. Relevant experience match (%)
3. Key strengths for this role
4. Potential gaps or concerns
5. Recommended interview focus areas
6. Questions to ask in screening call
7. Overall recommendation (Strong Yes/Maybe/Pass)

Be objective and focus on job-relevant qualifications.`,
  },
  {
    id: 'hr-3',
    industry: 'hr',
    task: 'Employee Onboarding Checklists',
    before: '1-2 hours creating customized onboarding plan for new hire',
    after: 'AI generates role-specific onboarding plan in 15 minutes',
    timeSaved: '45-90 min per new hire',
    tools: 'ChatGPT, Claude',
    prompt: `Create a comprehensive 30-day onboarding checklist for:
- Role: [Job Title]
- Department: [Team]
- Start date: [Date]
- Manager: [Name]

Organize by:
- Week 1 (Day-by-day)
- Week 2-4 (Key milestones)

Include:
1. Pre-arrival tasks (IT, desk, access)
2. First day agenda
3. Training sessions and topics
4. People to meet (with purpose)
5. Systems and tools to learn
6. First projects/assignments
7. Check-in points
8. 30-day success metrics

Make it actionable and role-specific.`,
  },
];

