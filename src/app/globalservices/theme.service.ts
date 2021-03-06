import { Injectable } from '@angular/core';

import { ThemeActions } from '../store/actions/theme.actions';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private themeActions: ThemeActions) {}

  switchTheme() {
    this.themeActions.switchTheme();
  }
}
