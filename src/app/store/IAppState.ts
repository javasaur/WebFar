import {Screen} from '../screen.model';

export interface IAppState {
  activeTheme: string;
  availableThemes: string[];
  screensAmount: number;
  defaultScreen: number; // not zero-based (1,2...)
  screens: Screen[];
  activeScreen: Screen | null;
}
