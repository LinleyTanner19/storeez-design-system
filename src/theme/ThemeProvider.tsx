import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { themes, getTheme, resolve } from '../tokens/colors';
import type { ThemeName, Mode, DSTheme, M3Palette } from '../tokens/colors';
import type { Density } from '../tokens/spacing';

export type { ThemeName, Mode } from '../tokens/colors';
export type { Density } from '../tokens/spacing';

interface ThemeContextValue {
  /** Brand axis — 5 values */
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  /** Mode axis — independent of brand. 5 x 2 = 10 valid combinations. */
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
  /** Density axis — comfortable (consumer) | compact (Systems / back-office) */
  density: Density;
  setDensity: (d: Density) => void;
  /** Resolved brand record and palette for the active brand + mode */
  brand: DSTheme;
  palette: M3Palette;
  /** Cycle to the next brand — used by the lab switcher */
  toggle: () => void;
  themes: readonly DSTheme[];
}

const DEFAULT_THEME: ThemeName = 'storeez';
const DEFAULT_MODE: Mode = 'dark';

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  mode: DEFAULT_MODE,
  setMode: () => {},
  toggleMode: () => {},
  density: 'comfortable',
  setDensity: () => {},
  brand: getTheme(DEFAULT_THEME),
  palette: resolve(DEFAULT_THEME, DEFAULT_MODE),
  toggle: () => {},
  themes,
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: Mode;
  defaultDensity?: Density;
  /**
   * When true the theme attributes are also written to <html>, so tokens reach
   * portalled UI (dialogs, menus, sheets). Default true.
   */
  applyToRoot?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  defaultMode = DEFAULT_MODE,
  defaultDensity = 'comfortable',
  applyToRoot = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [density, setDensity] = useState<Density>(defaultDensity);

  const toggleMode = useCallback(
    () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
    []
  );

  const toggle = useCallback(() => {
    setTheme(t => {
      const i = themes.findIndex(x => x.name === t);
      return themes[(i + 1) % themes.length].name;
    });
  }, []);

  // Portals render outside the wrapper div, so tokens must also live on <html>.
  useEffect(() => {
    if (!applyToRoot || typeof document === 'undefined') return;
    const el = document.documentElement;
    el.setAttribute('data-theme', theme);
    el.setAttribute('data-mode', mode);
    el.setAttribute('data-density', density);
    el.style.colorScheme = mode;
  }, [theme, mode, density, applyToRoot]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      mode,
      setMode,
      toggleMode,
      density,
      setDensity,
      brand: getTheme(theme),
      palette: resolve(theme, mode),
      toggle,
      themes,
    }),
    [theme, mode, density, toggle, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme} data-mode={mode} data-density={density}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
