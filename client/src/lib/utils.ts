import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = () => {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
export const calculateFocusTime = (focusSessions: { id: number; duration: number; data: string }[]) => {
  const totalFocusTime = (focusSessions.reduce((acc: number, current: { id: number; duration: number; data: string }) => acc + current?.duration, 0) / 60).toFixed(0);
  return totalFocusTime;
}

