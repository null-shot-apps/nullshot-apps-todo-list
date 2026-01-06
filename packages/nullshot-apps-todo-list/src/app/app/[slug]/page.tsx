'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { getAppProgress, startBuild, updateCheckedItems } from '@/lib/store';

const appData: Record<string, {
  name: string;
  prompt: string;
  todos: { phase: string; items: string[] }[];
}> = {
  'notebook': {
    name: 'Notebook',
    prompt: `Build a simple notebook app with the following features:
- Create, edit, and delete notes
- Each note has a title and content (rich text or markdown)
- Notes are saved to browser localStorage
- Search/filter notes by title
- Responsive design with a clean, minimal UI
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create note list view',
          'Add note creation form',
          'Implement localStorage save/load',
          'Add basic edit functionality',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test localStorage persistence',
          'Test on mobile devices',
          'Verify note deletion works',
          'Check edge cases (empty notes, long content)',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add search functionality',
          'Implement markdown support',
          'Add export notes feature',
          'Polish UI/UX',
        ],
      },
    ],
  },
  'task-tracker': {
    name: 'Task Tracker',
    prompt: `Build a task tracker app with the following features:
- Add, edit, complete, and delete tasks
- Mark tasks as complete/incomplete with checkbox
- Filter tasks by status (all, active, completed)
- Tasks saved to browser localStorage
- Clean, minimal UI with Tailwind CSS
- Use Next.js 15 with App Router`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create task input form',
          'Display task list',
          'Add checkbox toggle for completion',
          'Implement localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test task persistence',
          'Verify filter functionality',
          'Test on different screen sizes',
          'Check localStorage limits',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add due dates',
          'Implement priority levels',
          'Add task categories/tags',
          'Export task list',
        ],
      },
    ],
  },
  'habit-tracker': {
    name: 'Habit Tracker',
    prompt: `Build a habit tracker app with the following features:
- Create and manage daily habits
- Mark habits as complete for each day
- Visual calendar/grid showing completion history
- Streak counter for each habit
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create habit list',
          'Add daily check-in interface',
          'Show basic completion grid',
          'Implement localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test streak calculations',
          'Verify date handling across timezones',
          'Test with multiple habits',
          'Check mobile responsiveness',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add habit statistics',
          'Implement weekly/monthly views',
          'Add habit reminders',
          'Export habit data',
        ],
      },
    ],
  },
  'pomodoro-timer': {
    name: 'Pomodoro Timer',
    prompt: `Build a Pomodoro timer app with the following features:
- 25-minute work sessions, 5-minute breaks
- Start, pause, reset functionality
- Audio notification when timer completes
- Session counter (track completed pomodoros)
- Settings to customize work/break durations
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create timer display',
          'Implement start/pause/reset',
          'Add work/break mode toggle',
          'Basic audio notification',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test timer accuracy',
          'Verify audio works on all browsers',
          'Test pause/resume functionality',
          'Check background tab behavior',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add customizable durations',
          'Implement session history',
          'Add statistics dashboard',
          'Multiple notification sounds',
        ],
      },
    ],
  },
  'kanban-board': {
    name: 'Kanban Board',
    prompt: `Build a Kanban board app with the following features:
- Multiple columns (To Do, In Progress, Done)
- Drag and drop cards between columns
- Add, edit, delete cards
- Each card has title and description
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS
- Use a drag-and-drop library like dnd-kit`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create column layout',
          'Add card creation',
          'Implement drag and drop',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test drag and drop on mobile',
          'Verify data persistence',
          'Test with many cards',
          'Check edge cases',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add custom columns',
          'Implement card labels/tags',
          'Add due dates',
          'Export board data',
        ],
      },
    ],
  },
  'weekly-meal-planner': {
    name: 'Weekly Meal Planner',
    prompt: `Build a weekly meal planner app with the following features:
- 7-day grid (breakfast, lunch, dinner)
- Add meals to each slot
- Recipe notes for each meal
- Shopping list generator from planned meals
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create weekly grid layout',
          'Add meal input for each slot',
          'Implement localStorage',
          'Basic shopping list view',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test on mobile devices',
          'Verify data persistence',
          'Test shopping list generation',
          'Check with full week of meals',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add recipe database',
          'Implement meal templates',
          'Add nutritional info',
          'Export meal plan',
        ],
      },
    ],
  },
  'budget-envelope-system': {
    name: 'Budget Envelope System',
    prompt: `Build a budget envelope system app with the following features:
- Create budget categories (envelopes)
- Allocate money to each envelope
- Track spending from each envelope
- Visual progress bars showing remaining budget
- Monthly reset functionality
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create envelope list',
          'Add budget allocation',
          'Track spending per envelope',
          'Show remaining balance',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test calculations',
          'Verify localStorage persistence',
          'Test with multiple envelopes',
          'Check mobile responsiveness',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add spending history',
          'Implement monthly reports',
          'Add budget templates',
          'Export financial data',
        ],
      },
    ],
  },
  'reading-list': {
    name: 'Reading List',
    prompt: `Build a reading list app with the following features:
- Add books with title, author, and status (to-read, reading, completed)
- Mark books as completed with rating
- Filter by status
- Add notes/reviews for each book
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create book list view',
          'Add book input form',
          'Implement status toggle',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many books',
          'Verify filter functionality',
          'Test on mobile devices',
          'Check data persistence',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add book cover images',
          'Implement reading statistics',
          'Add book search/API integration',
          'Export reading list',
        ],
      },
    ],
  },
  'project-time-logger': {
    name: 'Project Time Logger',
    prompt: `Build a project time logger app with the following features:
- Create multiple projects
- Start/stop timer for each project
- Log time entries with notes
- View total time per project
- Daily/weekly time reports
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create project list',
          'Implement timer functionality',
          'Log time entries',
          'Show total time per project',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test timer accuracy',
          'Verify time calculations',
          'Test with multiple projects',
          'Check localStorage limits',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add time reports/charts',
          'Implement manual time entry',
          'Add project categories',
          'Export time logs',
        ],
      },
    ],
  },
  'decision-matrix-tool': {
    name: 'Decision Matrix Tool',
    prompt: `Build a decision matrix tool with the following features:
- Create decision options
- Add criteria with weights
- Score each option against criteria
- Calculate weighted scores
- Visual comparison of options
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create options input',
          'Add criteria with weights',
          'Implement scoring grid',
          'Calculate total scores',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test score calculations',
          'Verify weight adjustments',
          'Test with many options/criteria',
          'Check mobile layout',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add visual charts',
          'Implement templates',
          'Add comparison views',
          'Export decision matrix',
        ],
      },
    ],
  },
  'qr-code-generator': {
    name: 'QR Code Generator',
    prompt: `Build a QR code generator app with the following features:
- Input text/URL to generate QR code
- Display QR code image
- Download QR code as PNG
- Customize QR code size and colors
- History of generated QR codes (localStorage)
- Use Next.js 15 with App Router and Tailwind CSS
- Use a QR code library like qrcode.react`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create text input',
          'Generate QR code',
          'Display QR code',
          'Add download button',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various inputs',
          'Verify QR codes scan correctly',
          'Test download functionality',
          'Check mobile responsiveness',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add customization options',
          'Implement QR code history',
          'Add batch generation',
          'Support vCard/WiFi formats',
        ],
      },
    ],
  },
  'color-palette-generator': {
    name: 'Color Palette Generator',
    prompt: `Build a color palette generator app with the following features:
- Generate random color palettes
- Display colors with hex codes
- Copy hex codes to clipboard
- Lock colors and regenerate others
- Save favorite palettes to localStorage
- Export palette as CSS/JSON
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Generate random colors',
          'Display color swatches',
          'Show hex codes',
          'Add copy to clipboard',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test color generation',
          'Verify clipboard functionality',
          'Test on different browsers',
          'Check accessibility',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add color lock feature',
          'Implement palette history',
          'Add export formats',
          'Generate complementary colors',
        ],
      },
    ],
  },
  'invoice-receipt-maker': {
    name: 'Invoice/Receipt Maker',
    prompt: `Build an invoice/receipt maker app with the following features:
- Create invoices with line items
- Add business and client details
- Calculate totals with tax
- Generate PDF or print
- Save invoices to localStorage
- Invoice templates
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create invoice form',
          'Add line items',
          'Calculate totals',
          'Basic print view',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test calculations',
          'Verify print layout',
          'Test with many line items',
          'Check mobile input',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add PDF export',
          'Implement templates',
          'Add invoice numbering',
          'Client database',
        ],
      },
    ],
  },
  'placeholder-image-generator': {
    name: 'Placeholder Image Generator',
    prompt: `Build a placeholder image generator app with the following features:
- Specify image dimensions
- Choose background color
- Add custom text overlay
- Download generated image
- Common size presets
- Use Next.js 15 with App Router and Tailwind CSS
- Use HTML Canvas API for image generation`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create dimension inputs',
          'Generate canvas image',
          'Add text overlay',
          'Download functionality',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test various dimensions',
          'Verify download works',
          'Test text rendering',
          'Check on mobile',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add color picker',
          'Implement size presets',
          'Add pattern options',
          'Batch generation',
        ],
      },
    ],
  },
  'json-csv-converter': {
    name: 'JSON/CSV Converter',
    prompt: `Build a JSON/CSV converter app with the following features:
- Convert JSON to CSV and vice versa
- Paste or upload files
- Preview converted data
- Download converted file
- Handle nested JSON objects
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create input textarea',
          'Implement JSON to CSV',
          'Implement CSV to JSON',
          'Add download button',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with complex JSON',
          'Test with large files',
          'Verify conversion accuracy',
          'Check error handling',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add file upload',
          'Implement data preview',
          'Add format validation',
          'Support nested objects',
        ],
      },
    ],
  },
  'regex-tester': {
    name: 'Regex Tester',
    prompt: `Build a regex tester app with the following features:
- Input regex pattern and test string
- Highlight matches in real-time
- Show match groups
- Common regex examples/snippets
- Explain regex pattern
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create regex input',
          'Create test string input',
          'Highlight matches',
          'Show match count',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with complex patterns',
          'Verify highlighting accuracy',
          'Test with long strings',
          'Check error handling',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add regex library',
          'Implement pattern explanation',
          'Add replace functionality',
          'Save regex history',
        ],
      },
    ],
  },
  'lorem-ipsum-generator': {
    name: 'Lorem Ipsum Generator',
    prompt: `Build a Lorem Ipsum generator app with the following features:
- Generate paragraphs, sentences, or words
- Specify quantity
- Copy to clipboard
- Different placeholder text styles (classic, hipster, etc.)
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Generate Lorem Ipsum text',
          'Add quantity selector',
          'Display generated text',
          'Copy to clipboard',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with large quantities',
          'Verify clipboard works',
          'Test on mobile',
          'Check text formatting',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add text style options',
          'Implement word/sentence mode',
          'Add HTML output option',
          'Save generation history',
        ],
      },
    ],
  },
  'unit-converter': {
    name: 'Unit Converter',
    prompt: `Build a unit converter app with the following features:
- Convert between common units (length, weight, temperature, etc.)
- Real-time conversion as you type
- Multiple unit categories
- Swap from/to units
- Conversion history
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create unit selector',
          'Implement conversion logic',
          'Real-time updates',
          'Basic unit categories',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test conversion accuracy',
          'Verify all unit types',
          'Test edge cases',
          'Check mobile input',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add more unit categories',
          'Implement favorites',
          'Add conversion history',
          'Support custom units',
        ],
      },
    ],
  },
  'aspect-ratio-calculator': {
    name: 'Aspect Ratio Calculator',
    prompt: `Build an aspect ratio calculator app with the following features:
- Calculate missing dimension from aspect ratio
- Common aspect ratio presets (16:9, 4:3, etc.)
- Scale dimensions proportionally
- Visual preview of aspect ratio
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create dimension inputs',
          'Calculate aspect ratio',
          'Add preset ratios',
          'Show calculated dimensions',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test calculations',
          'Verify preset ratios',
          'Test with decimal values',
          'Check mobile layout',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add visual preview',
          'Implement crop calculator',
          'Add custom ratios',
          'Batch calculations',
        ],
      },
    ],
  },
  'flashcard-app': {
    name: 'Flashcard App',
    prompt: `Build a flashcard app with the following features:
- Create flashcard decks
- Add cards with front/back content
- Study mode with flip animation
- Track correct/incorrect answers
- Spaced repetition algorithm
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create deck management',
          'Add card creation',
          'Implement flip animation',
          'Basic study mode',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many cards',
          'Verify animations',
          'Test on mobile',
          'Check localStorage',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add spaced repetition',
          'Implement statistics',
          'Add image support',
          'Export/import decks',
        ],
      },
    ],
  },
  'typing-speed-test': {
    name: 'Typing Speed Test',
    prompt: `Build a typing speed test app with the following features:
- Display random text to type
- Track typing speed (WPM)
- Calculate accuracy percentage
- Timer (30s, 60s, 120s options)
- Show mistakes in real-time
- Save best scores to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Display test text',
          'Track user input',
          'Calculate WPM',
          'Show accuracy',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test WPM calculations',
          'Verify accuracy tracking',
          'Test timer functionality',
          'Check on mobile',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add difficulty levels',
          'Implement leaderboard',
          'Add custom text option',
          'Statistics dashboard',
        ],
      },
    ],
  },
  'mental-math-trainer': {
    name: 'Mental Math Trainer',
    prompt: `Build a mental math trainer app with the following features:
- Generate random math problems
- Multiple difficulty levels
- Timer for each problem
- Track score and accuracy
- Different operation types (add, subtract, multiply, divide)
- Save progress to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Generate math problems',
          'Check answers',
          'Track score',
          'Basic timer',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test problem generation',
          'Verify answer checking',
          'Test timer accuracy',
          'Check mobile input',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add difficulty levels',
          'Implement progress tracking',
          'Add statistics',
          'Custom problem sets',
        ],
      },
    ],
  },
  'language-vocabulary-builder': {
    name: 'Language Vocabulary Builder',
    prompt: `Build a language vocabulary builder app with the following features:
- Add words with translations
- Quiz mode (flashcard style)
- Track learned words
- Multiple languages support
- Spaced repetition
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create word list',
          'Add word input form',
          'Basic quiz mode',
          'Track progress',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many words',
          'Verify quiz logic',
          'Test on mobile',
          'Check localStorage',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add spaced repetition',
          'Implement audio pronunciation',
          'Add word categories',
          'Export/import vocabulary',
        ],
      },
    ],
  },
  'periodic-table-explorer': {
    name: 'Periodic Table Explorer',
    prompt: `Build a periodic table explorer app with the following features:
- Interactive periodic table grid
- Click element to view details
- Search elements by name/symbol
- Filter by element type
- Element properties and facts
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create periodic table grid',
          'Add element data',
          'Implement click to view details',
          'Basic search',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test on mobile',
          'Verify element data accuracy',
          'Test search functionality',
          'Check responsive layout',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add element filters',
          'Implement 3D models',
          'Add quiz mode',
          'Electron configuration viewer',
        ],
      },
    ],
  },
  'music-interval-trainer': {
    name: 'Music Interval Trainer',
    prompt: `Build a music interval trainer app with the following features:
- Play two notes (interval)
- User identifies the interval
- Multiple difficulty levels
- Track accuracy
- Visual keyboard reference
- Use Next.js 15 with App Router and Tailwind CSS
- Use Web Audio API for sound generation`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Generate audio tones',
          'Play intervals',
          'Check user answers',
          'Track score',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test audio on all browsers',
          'Verify interval accuracy',
          'Test on mobile',
          'Check answer validation',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add difficulty levels',
          'Implement progress tracking',
          'Add chord recognition',
          'Statistics dashboard',
        ],
      },
    ],
  },
  'geography-quiz': {
    name: 'Geography Quiz',
    prompt: `Build a geography quiz app with the following features:
- Multiple quiz types (capitals, flags, maps)
- Multiple choice questions
- Track score and accuracy
- Different difficulty levels
- Timed mode option
- Save high scores to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create question database',
          'Implement quiz logic',
          'Track score',
          'Show results',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test question randomization',
          'Verify answer checking',
          'Test on mobile',
          'Check localStorage',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add more quiz types',
          'Implement leaderboard',
          'Add timed mode',
          'Statistics tracking',
        ],
      },
    ],
  },
  'code-snippet-library': {
    name: 'Code Snippet Library',
    prompt: `Build a code snippet library app with the following features:
- Save code snippets with syntax highlighting
- Organize by language/tags
- Search snippets
- Copy to clipboard
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS
- Use a syntax highlighting library like Prism or highlight.js`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create snippet form',
          'Display snippet list',
          'Add syntax highlighting',
          'Copy to clipboard',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various languages',
          'Verify highlighting',
          'Test search functionality',
          'Check mobile layout',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add tags/categories',
          'Implement advanced search',
          'Add snippet sharing',
          'Export/import library',
        ],
      },
    ],
  },
  'water-intake-tracker': {
    name: 'Water Intake Tracker',
    prompt: `Build a water intake tracker app with the following features:
- Set daily water goal
- Log water intake throughout the day
- Visual progress indicator
- Daily history calendar
- Reminders (browser notifications)
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create intake logger',
          'Set daily goal',
          'Show progress bar',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test calculations',
          'Verify data persistence',
          'Test on mobile',
          'Check date handling',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add notifications',
          'Implement statistics',
          'Add custom drink sizes',
          'Weekly/monthly reports',
        ],
      },
    ],
  },
  'stretch-exercise-timer': {
    name: 'Stretch/Exercise Timer',
    prompt: `Build a stretch/exercise timer app with the following features:
- Create exercise routines
- Interval timer for each exercise
- Audio/visual cues for transitions
- Rest periods between exercises
- Save custom routines to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create routine builder',
          'Implement timer',
          'Add exercise transitions',
          'Audio notifications',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test timer accuracy',
          'Verify audio cues',
          'Test on mobile',
          'Check background behavior',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add exercise library',
          'Implement video demos',
          'Add progress tracking',
          'Share routines',
        ],
      },
    ],
  },
  'sleep-log': {
    name: 'Sleep Log',
    prompt: `Build a sleep log app with the following features:
- Log sleep and wake times
- Calculate sleep duration
- Track sleep quality rating
- Visual sleep history calendar
- Sleep statistics (average, trends)
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create sleep entry form',
          'Calculate duration',
          'Display sleep history',
          'Basic statistics',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test time calculations',
          'Verify date handling',
          'Test on mobile',
          'Check localStorage',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add sleep charts',
          'Implement sleep goals',
          'Add notes/tags',
          'Export sleep data',
        ],
      },
    ],
  },
  'breathing-exercise-guide': {
    name: 'Breathing Exercise Guide',
    prompt: `Build a breathing exercise guide app with the following features:
- Multiple breathing techniques (4-7-8, box breathing, etc.)
- Visual breathing animation
- Audio guidance
- Customizable timing
- Session history
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create breathing animation',
          'Implement timer',
          'Add technique presets',
          'Audio cues',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test animation smoothness',
          'Verify timing accuracy',
          'Test audio on all browsers',
          'Check mobile experience',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add custom techniques',
          'Implement session tracking',
          'Add background sounds',
          'Statistics dashboard',
        ],
      },
    ],
  },
  'symptom-diary': {
    name: 'Symptom Diary',
    prompt: `Build a symptom diary app with the following features:
- Log symptoms with severity
- Track triggers and medications
- Calendar view of entries
- Search and filter entries
- Export data for doctor visits
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create symptom entry form',
          'Display entry list',
          'Add severity scale',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many entries',
          'Verify date handling',
          'Test search/filter',
          'Check mobile input',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add calendar view',
          'Implement patterns analysis',
          'Add export feature',
          'Medication tracking',
        ],
      },
    ],
  },
  'pixel-art-editor': {
    name: 'Pixel Art Editor',
    prompt: `Build a pixel art editor app with the following features:
- Grid-based canvas
- Color picker
- Drawing tools (pencil, fill, eraser)
- Adjustable grid size
- Export as PNG
- Save projects to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create pixel grid',
          'Implement drawing',
          'Add color picker',
          'Basic tools',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test on mobile',
          'Verify drawing accuracy',
          'Test export functionality',
          'Check performance',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add more tools',
          'Implement layers',
          'Add animation frames',
          'Gallery of saved art',
        ],
      },
    ],
  },
  'soundboard': {
    name: 'Soundboard',
    prompt: `Build a soundboard app with the following features:
- Upload custom sound files
- Grid of sound buttons
- Play sounds on click
- Organize sounds into categories
- Volume control
- Save soundboard to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create sound button grid',
          'Upload sound files',
          'Play audio on click',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various audio formats',
          'Verify playback on all browsers',
          'Test on mobile',
          'Check localStorage limits',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add categories',
          'Implement keyboard shortcuts',
          'Add sound effects',
          'Share soundboards',
        ],
      },
    ],
  },
  'random-name-team-generator': {
    name: 'Random Name/Team Generator',
    prompt: `Build a random name/team generator app with the following features:
- Input list of names
- Generate random teams
- Specify team size or number of teams
- Shuffle and regenerate
- Save team configurations to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create name input',
          'Implement random team generation',
          'Display teams',
          'Shuffle functionality',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various list sizes',
          'Verify randomization',
          'Test edge cases',
          'Check mobile layout',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add team constraints',
          'Implement history',
          'Add export feature',
          'Custom team names',
        ],
      },
    ],
  },
  'countdown-creator': {
    name: 'Countdown Creator',
    prompt: `Build a countdown creator app with the following features:
- Create multiple countdowns
- Set target date and time
- Display time remaining (days, hours, minutes, seconds)
- Visual progress bar
- Notifications when countdown completes
- Save countdowns to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create countdown form',
          'Calculate time remaining',
          'Display countdown',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test time calculations',
          'Verify timezone handling',
          'Test on mobile',
          'Check update frequency',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add notifications',
          'Implement themes',
          'Add recurring countdowns',
          'Share countdowns',
        ],
      },
    ],
  },
  'meme-generator': {
    name: 'Meme Generator',
    prompt: `Build a meme generator app with the following features:
- Upload image or use templates
- Add top and bottom text
- Customize font, size, color
- Download generated meme
- Save meme templates to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Upload image',
          'Add text overlay',
          'Position text',
          'Download meme',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various images',
          'Verify text rendering',
          'Test download',
          'Check mobile',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add meme templates',
          'Implement text customization',
          'Add stickers/effects',
          'Share memes',
        ],
      },
    ],
  },
  'ascii-art-converter': {
    name: 'ASCII Art Converter',
    prompt: `Build an ASCII art converter app with the following features:
- Upload image
- Convert to ASCII art
- Adjust character density
- Customize output size
- Copy ASCII art to clipboard
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Upload image',
          'Convert to ASCII',
          'Display ASCII art',
          'Copy to clipboard',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various images',
          'Verify conversion quality',
          'Test on mobile',
          'Check performance',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add customization options',
          'Implement color ASCII',
          'Add character sets',
          'Export as image',
        ],
      },
    ],
  },
  'drum-machine': {
    name: 'Drum Machine',
    prompt: `Build a drum machine app with the following features:
- Grid sequencer (16 steps)
- Multiple drum sounds (kick, snare, hi-hat, etc.)
- Play/pause/stop controls
- Adjustable tempo (BPM)
- Save patterns to localStorage
- Use Next.js 15 with App Router and Tailwind CSS
- Use Web Audio API`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create sequencer grid',
          'Load drum samples',
          'Implement playback',
          'Add tempo control',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test timing accuracy',
          'Verify audio on all browsers',
          'Test on mobile',
          'Check performance',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add more sounds',
          'Implement pattern saving',
          'Add effects',
          'Export audio',
        ],
      },
    ],
  },
  'story-prompt-generator': {
    name: 'Story Prompt Generator',
    prompt: `Build a story prompt generator app with the following features:
- Generate random story prompts
- Multiple genres (fantasy, sci-fi, romance, etc.)
- Character, setting, and plot generators
- Save favorite prompts to localStorage
- Share prompts
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create prompt database',
          'Generate random prompts',
          'Display prompts',
          'Save favorites',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test randomization',
          'Verify prompt quality',
          'Test on mobile',
          'Check localStorage',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add genre filters',
          'Implement custom prompts',
          'Add prompt combinations',
          'Export prompts',
        ],
      },
    ],
  },
  'personal-crm': {
    name: 'Personal CRM',
    prompt: `Build a personal CRM app with the following features:
- Add contacts with details
- Log interactions and notes
- Set reminders to follow up
- Tag and categorize contacts
- Search and filter
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create contact form',
          'Display contact list',
          'Add notes/interactions',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many contacts',
          'Verify search functionality',
          'Test on mobile',
          'Check data persistence',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add reminders',
          'Implement tags',
          'Add relationship mapping',
          'Export contacts',
        ],
      },
    ],
  },
  'workout-log': {
    name: 'Workout Log',
    prompt: `Build a workout log app with the following features:
- Log exercises with sets, reps, weight
- Create workout routines
- Track progress over time
- Calendar view of workouts
- Exercise library
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create workout entry form',
          'Log exercises',
          'Display workout history',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many entries',
          'Verify calculations',
          'Test on mobile',
          'Check date handling',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add progress charts',
          'Implement routines',
          'Add exercise library',
          'Export workout data',
        ],
      },
    ],
  },
  'plant-care-tracker': {
    name: 'Plant Care Tracker',
    prompt: `Build a plant care tracker app with the following features:
- Add plants with care schedules
- Track watering, fertilizing, repotting
- Reminders for care tasks
- Plant health notes
- Photo gallery for each plant
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create plant list',
          'Add care schedule',
          'Log care activities',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many plants',
          'Verify reminder logic',
          'Test on mobile',
          'Check date calculations',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add notifications',
          'Implement photo gallery',
          'Add plant database',
          'Care statistics',
        ],
      },
    ],
  },
  'collection-catalog': {
    name: 'Collection Catalog',
    prompt: `Build a collection catalog app with the following features:
- Create multiple collections
- Add items with photos and details
- Tag and categorize items
- Search and filter
- Track item value/condition
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create collection structure',
          'Add item form',
          'Display item grid',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with many items',
          'Verify search/filter',
          'Test on mobile',
          'Check image handling',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add statistics',
          'Implement wishlist',
          'Add export feature',
          'Share collections',
        ],
      },
    ],
  },
  'survey-poll-creator': {
    name: 'Survey/Poll Creator',
    prompt: `Build a survey/poll creator app with the following features:
- Create surveys with multiple question types
- Multiple choice, text, rating questions
- Collect responses
- View results and analytics
- Export results
- Data saved to browser localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create survey builder',
          'Add question types',
          'Collect responses',
          'Display results',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test with various question types',
          'Verify response collection',
          'Test on mobile',
          'Check data persistence',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add more question types',
          'Implement analytics',
          'Add export feature',
          'Share surveys',
        ],
      },
    ],
  },
  'communication-board': {
    name: 'Communication Board',
    prompt: `Build a communication board app with the following features:
- Grid of buttons with images and text
- Text-to-speech for each button
- Customizable buttons
- Categories/pages
- Large, accessible buttons
- Save board configuration to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create button grid',
          'Implement text-to-speech',
          'Add button customization',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test TTS on all browsers',
          'Verify accessibility',
          'Test on mobile/tablet',
          'Check button sizes',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add categories',
          'Implement phrase building',
          'Add image library',
          'Export/import boards',
        ],
      },
    ],
  },
  'visual-schedule': {
    name: 'Visual Schedule',
    prompt: `Build a visual schedule app with the following features:
- Create daily schedules with images
- Drag and drop to reorder tasks
- Mark tasks as complete
- Timer for each task
- Print schedule
- Save schedules to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create schedule builder',
          'Add task with images',
          'Display schedule',
          'Mark complete',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test drag and drop',
          'Verify on mobile/tablet',
          'Test print layout',
          'Check accessibility',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add timers',
          'Implement templates',
          'Add notifications',
          'Multiple schedules',
        ],
      },
    ],
  },
  'large-button-emergency-dialer': {
    name: 'Large-Button Emergency Dialer',
    prompt: `Build a large-button emergency dialer app with the following features:
- Large, high-contrast buttons
- Store emergency contacts
- One-tap to call (tel: links)
- Display contact photos
- Simple, accessible interface
- Save contacts to localStorage
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create large button grid',
          'Add contact form',
          'Implement tel: links',
          'Save to localStorage',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test on mobile devices',
          'Verify tel: links work',
          'Test accessibility',
          'Check button sizes',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add contact photos',
          'Implement voice commands',
          'Add location sharing',
          'Emergency info page',
        ],
      },
    ],
  },
  'high-contrast-clock': {
    name: 'High-Contrast Clock',
    prompt: `Build a high-contrast clock app with the following features:
- Large, easy-to-read time display
- High contrast color schemes
- Date display
- Optional seconds display
- Fullscreen mode
- Customizable colors
- Use Next.js 15 with App Router and Tailwind CSS`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create large time display',
          'Implement real-time updates',
          'Add high-contrast theme',
          'Show date',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test on various screen sizes',
          'Verify time accuracy',
          'Test accessibility',
          'Check readability',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add color customization',
          'Implement fullscreen',
          'Add alarm feature',
          'Multiple time zones',
        ],
      },
    ],
  },
  'text-to-speech-reader': {
    name: 'Text-to-Speech Reader',
    prompt: `Build a text-to-speech reader app with the following features:
- Paste or type text
- Text-to-speech playback
- Adjustable speed and voice
- Highlight current word
- Pause/resume functionality
- Save text to localStorage
- Use Next.js 15 with App Router and Tailwind CSS
- Use Web Speech API`,
    todos: [
      {
        phase: 'MVP',
        items: [
          'Create text input',
          'Implement TTS',
          'Add playback controls',
          'Basic highlighting',
        ],
      },
      {
        phase: 'Testing',
        items: [
          'Test on all browsers',
          'Verify voice options',
          'Test with long text',
          'Check mobile support',
        ],
      },
      {
        phase: 'Production',
        items: [
          'Add voice selection',
          'Implement speed control',
          'Add file upload',
          'Save reading history',
        ],
      },
    ],
  },
};

export default function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [appStatus, setAppStatus] = useState<'not-started' | 'in-progress' | 'done'>('not-started');

  useEffect(() => {
    // Load progress from localStorage
    const progress = getAppProgress(resolvedParams.slug);
    setCheckedItems(progress.checkedItems || {});
    setAppStatus(progress.status || 'not-started');
  }, [resolvedParams.slug]);

  const app = appData[resolvedParams.slug];

  if (!app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">App Not Found</h1>
          <Link href="/" className="text-purple-300 hover:text-purple-200">
            ← Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditedPrompt(app.prompt);
    setIsEditing(true);
  };

  const handleCopy = () => {
    const textToCopy = isEditing ? editedPrompt : app.prompt;
    navigator.clipboard.writeText(textToCopy);
  };

  const toggleTodo = (phase: string, index: number) => {
    const key = `${phase}-${index}`;
    const newCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newCheckedItems);
    
    // Calculate total items
    const totalItems = app.todos.reduce((sum, phase) => sum + phase.items.length, 0);
    
    // Update progress in localStorage
    updateCheckedItems(resolvedParams.slug, newCheckedItems, totalItems);
    
    // Update local status
    const checkedCount = Object.values(newCheckedItems).filter(Boolean).length;
    const allChecked = checkedCount === totalItems && totalItems > 0;
    setAppStatus(allChecked ? 'done' : 'in-progress');
  };

  const handleStartBuild = () => {
    startBuild(resolvedParams.slug);
    setAppStatus('in-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to catalog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">{app.name}</h1>
              <p className="text-xl text-purple-200">
                Copy the prompt below and use it with Nullshot to build this app
              </p>
            </div>
            {appStatus === 'not-started' && (
              <button
                onClick={handleStartBuild}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Build
              </button>
            )}
            {appStatus === 'in-progress' && (
              <div className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 font-semibold rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                In Progress
              </div>
            )}
            {appStatus === 'done' && (
              <div className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-300 font-semibold rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Completed
              </div>
            )}
          </div>
        </header>

        {/* Prompt Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-white">AI Prompt</h2>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {isEditing ? 'Editing...' : 'Edit'}
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          {isEditing ? (
            <textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="w-full h-64 bg-slate-800 text-white p-6 rounded-lg font-mono text-sm border border-purple-500/30 focus:border-purple-500 focus:outline-none"
            />
          ) : (
            <div className="bg-slate-800 text-white p-6 rounded-lg font-mono text-sm whitespace-pre-wrap border border-purple-500/30">
              {app.prompt}
            </div>
          )}
        </section>

        {/* Todo Checklist */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Development Checklist</h2>
          <div className="space-y-6">
            {app.todos.map((phase) => (
              <div key={phase.phase} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">{phase.phase}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, index) => {
                    const key = `${phase.phase}-${index}`;
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={checkedItems[key] || false}
                          onChange={() => toggleTodo(phase.phase, index)}
                          className="mt-1 w-5 h-5 rounded border-purple-500/50 bg-slate-700 checked:bg-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900 cursor-pointer"
                        />
                        <span className={`text-white ${checkedItems[key] ? 'line-through opacity-50' : ''}`}>
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}



