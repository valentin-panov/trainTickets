export const setItem = (name: string, value: string): void => localStorage.setItem(name, value);
export const getItem = (name: string): string => <string>localStorage.getItem(name);
