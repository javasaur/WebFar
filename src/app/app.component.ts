import { Component, OnInit, HostListener, Output } from '@angular/core';
import { ThemeActions } from './store/theme.actions';
import { NgRedux, select } from '@angular-redux/store';
import { Screen } from './screen.model';
import { IAppState } from './store/IAppState';
import { ScreenActions } from './store/screen.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  @select() activeTheme;
  @Output() activeTheme$: string;
  @select() screens;
  screens$: Screen[];
  @select() activeScreen;
  activeScreen$: Screen;

  constructor(private store: NgRedux<IAppState>,
              private themeActions: ThemeActions,
              private screenActions: ScreenActions) {}

  ngOnInit() {
    this.setSubscriptionToState();
    this.screenActions.setupScreens();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();

    const key = event.key;
    if (key === 'q') {
      this.themeActions.switchTheme();
      return;
    }

    if (key === 'Tab') {
      this.screenActions.moveToNextScreen();
    }

    this.passEventToActiveScreen(event);
  }

  moveToScreen(screenId) {
    this.screenActions.moveToScreen(screenId);
  }

  passEventToActiveScreen(event) {
    this.activeScreen$.event = event;
  }

  setSubscriptionToState() {
    this.screens.subscribe((screens: Screen[]) => {
      this.screens$ = screens;
    });
    this.activeTheme.subscribe((theme: string) => {
      this.activeTheme$ = theme;
    });
    this.activeScreen.subscribe((screen: Screen) => {
      this.activeScreen$ = screen;
    });
  }
}
