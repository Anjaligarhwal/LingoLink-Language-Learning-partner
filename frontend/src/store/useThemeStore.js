import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("LingoLink-theme") || "valentine",
  setTheme: (theme) => {
    localStorage.setItem("LingoLink-theme", theme);
    set({ theme });
  },
}));
