import { Component, OnInit, HostListener, Output } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store';
import { CHANGE_ACTIVE_SCREEN, INITIALIZE_SCREENS, MOVE_TO_NEXT_SCREEN, SWITCH_THEME} from './actions';
import { Screen } from './screen.model';

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

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.setSubscriptionToState();

    const initialState = this.ngRedux.getState();
    this.ngRedux.dispatch({type: INITIALIZE_SCREENS});
    this.ngRedux.dispatch({type: CHANGE_ACTIVE_SCREEN, id: initialState.defaultScreen});
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();

    const key = event.key;
    if (key === 'q') {
      this.switchTheme();
    }

    if (key === 'Tab') {
      this.moveToNextScreen();
    }

    this.passEventToActiveScreen(event);
  }

  passEventToActiveScreen(event) {
    this.activeScreen$.event = event;
  }

  moveToNextScreen() {
    this.ngRedux.dispatch({type : MOVE_TO_NEXT_SCREEN});
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

  switchTheme() {
    this.ngRedux.dispatch({type: SWITCH_THEME});
  }
}
