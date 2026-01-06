'use client';

import Link from 'next/link';

const apps = [
  { name: 'Notebook', slug: 'notebook', category: 'Productivity' },
  { name: 'Task Tracker', slug: 'task-tracker', category: 'Productivity' },
  { name: 'Habit Tracker', slug: 'habit-tracker', category: 'Productivity' },
  { name: 'Pomodoro Timer', slug: 'pomodoro-timer', category: 'Productivity' },
  { name: 'Kanban Board', slug: 'kanban-board', category: 'Productivity' },
  { name: 'Weekly Meal Planner', slug: 'weekly-meal-planner', category: 'Lifestyle' },
  { name: 'Budget Envelope System', slug: 'budget-envelope-system', category: 'Finance' },
  { name: 'Reading List', slug: 'reading-list', category: 'Lifestyle' },
  { name: 'Project Time Logger', slug: 'project-time-logger', category: 'Productivity' },
  { name: 'Decision Matrix Tool', slug: 'decision-matrix-tool', category: 'Productivity' },
  { name: 'QR Code Generator', slug: 'qr-code-generator', category: 'Utilities' },
  { name: 'Color Palette Generator', slug: 'color-palette-generator', category: 'Design' },
  { name: 'Invoice/Receipt Maker', slug: 'invoice-receipt-maker', category: 'Finance' },
  { name: 'Placeholder Image Generator', slug: 'placeholder-image-generator', category: 'Design' },
  { name: 'JSON/CSV Converter', slug: 'json-csv-converter', category: 'Developer' },
  { name: 'Regex Tester', slug: 'regex-tester', category: 'Developer' },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', category: 'Design' },
  { name: 'Unit Converter', slug: 'unit-converter', category: 'Utilities' },
  { name: 'Aspect Ratio Calculator', slug: 'aspect-ratio-calculator', category: 'Design' },
  { name: 'Flashcard App', slug: 'flashcard-app', category: 'Education' },
  { name: 'Typing Speed Test', slug: 'typing-speed-test', category: 'Education' },
  { name: 'Mental Math Trainer', slug: 'mental-math-trainer', category: 'Education' },
  { name: 'Language Vocabulary Builder', slug: 'language-vocabulary-builder', category: 'Education' },
  { name: 'Periodic Table Explorer', slug: 'periodic-table-explorer', category: 'Education' },
  { name: 'Music Interval Trainer', slug: 'music-interval-trainer', category: 'Education' },
  { name: 'Geography Quiz', slug: 'geography-quiz', category: 'Education' },
  { name: 'Code Snippet Library', slug: 'code-snippet-library', category: 'Developer' },
  { name: 'Water Intake Tracker', slug: 'water-intake-tracker', category: 'Health' },
  { name: 'Stretch/Exercise Timer', slug: 'stretch-exercise-timer', category: 'Health' },
  { name: 'Sleep Log', slug: 'sleep-log', category: 'Health' },
  { name: 'Breathing Exercise Guide', slug: 'breathing-exercise-guide', category: 'Health' },
  { name: 'Symptom Diary', slug: 'symptom-diary', category: 'Health' },
  { name: 'Pixel Art Editor', slug: 'pixel-art-editor', category: 'Creative' },
  { name: 'Soundboard', slug: 'soundboard', category: 'Creative' },
  { name: 'Random Name/Team Generator', slug: 'random-name-team-generator', category: 'Utilities' },
  { name: 'Countdown Creator', slug: 'countdown-creator', category: 'Utilities' },
  { name: 'Meme Generator', slug: 'meme-generator', category: 'Creative' },
  { name: 'ASCII Art Converter', slug: 'ascii-art-converter', category: 'Creative' },
  { name: 'Drum Machine', slug: 'drum-machine', category: 'Creative' },
  { name: 'Story Prompt Generator', slug: 'story-prompt-generator', category: 'Creative' },
  { name: 'Personal CRM', slug: 'personal-crm', category: 'Lifestyle' },
  { name: 'Workout Log', slug: 'workout-log', category: 'Health' },
  { name: 'Plant Care Tracker', slug: 'plant-care-tracker', category: 'Lifestyle' },
  { name: 'Collection Catalog', slug: 'collection-catalog', category: 'Lifestyle' },
  { name: 'Survey/Poll Creator', slug: 'survey-poll-creator', category: 'Utilities' },
  { name: 'Communication Board', slug: 'communication-board', category: 'Accessibility' },
  { name: 'Visual Schedule', slug: 'visual-schedule', category: 'Accessibility' },
  { name: 'Large-Button Emergency Dialer', slug: 'large-button-emergency-dialer', category: 'Accessibility' },
  { name: 'High-Contrast Clock', slug: 'high-contrast-clock', category: 'Accessibility' },
  { name: 'Text-to-Speech Reader', slug: 'text-to-speech-reader', category: 'Accessibility' },
];

const categories = Array.from(new Set(apps.map(app => app.category))).sort();

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nullshot Apps Prompts Catalog
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Ready-made prompts and checklists for vibe coders. Pick an app, copy the prompt, and build with Nullshot.
          </p>
        </header>

        {/* Categories */}
        {categories.map(category => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-purple-500/30 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {apps
                .filter(app => app.category === category)
                .map(app => (
                  <Link
                    key={app.slug}
                    href={`/app/${app.slug}`}
                    className="group bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 border border-purple-500/20 hover:border-purple-400/50"
                  >
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-purple-200/70 text-sm mt-2">
                      View prompt & checklist →
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

