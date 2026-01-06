// Global state management for app progress tracking

export interface AppProgress {
  slug: string;
  status: 'not-started' | 'in-progress' | 'done';
  checkedItems: Record<string, boolean>;
  startedAt?: number;
  completedAt?: number;
}

const STORAGE_KEY = 'nullshot-apps-progress';

export function getAppProgress(slug: string): AppProgress {
  if (typeof window === 'undefined') {
    return { slug, status: 'not-started', checkedItems: {} };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const allProgress: Record<string, AppProgress> = stored ? JSON.parse(stored) : {};
  
  return allProgress[slug] || { slug, status: 'not-started', checkedItems: {} };
}

export function getAllProgress(): Record<string, AppProgress> {
  if (typeof window === 'undefined') {
    return {};
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function updateAppProgress(slug: string, updates: Partial<AppProgress>): void {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const allProgress: Record<string, AppProgress> = stored ? JSON.parse(stored) : {};
  
  allProgress[slug] = {
    ...allProgress[slug],
    slug,
    ...updates,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('app-progress-updated', { detail: { slug } }));
}

export function startBuild(slug: string): void {
  updateAppProgress(slug, {
    status: 'in-progress',
    startedAt: Date.now(),
  });
}

export function updateCheckedItems(slug: string, checkedItems: Record<string, boolean>, totalItems: number): void {
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const allChecked = checkedCount === totalItems && totalItems > 0;
  
  updateAppProgress(slug, {
    checkedItems,
    status: allChecked ? 'done' : 'in-progress',
    completedAt: allChecked ? Date.now() : undefined,
  });
}

