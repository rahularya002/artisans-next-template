const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      if (!isBrowser) return null;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error parsing localStorage item:', error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      if (!isBrowser) return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return;
    window.localStorage.removeItem(key);
  },

  clear: (): void => {
    if (!isBrowser) return;
    window.localStorage.clear();
  }
};