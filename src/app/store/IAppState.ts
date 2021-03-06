import { BGAction } from '../bgactions/bgaction.model';
import { Screen } from '../filesystem/screen/screen.model';

export interface IAppState {
  activeTheme: string;
  availableThemes: string[];
  screensAmount: number;
  defaultScreen: number; // not zero-based (1,2...)
  screens: Screen[];
  activeScreen: Screen | null;
  currentPath: string | null;
  pathError: boolean;
  openFilesOption: string;
  openFilesOptions: string[];
  editorMode: boolean;
  bgActions: BGAction[];
  buffer: string | null;
}
