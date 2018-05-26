import { Component, OnInit, HostListener, Output } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import {IAppState} from './store';
import { SWITCH_THEME } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  @Output() isLeftScreenActive: boolean;
  @Output() leftScreenEvent: any;
  @Output() rightScreenEvent: any;
  @select('activeTheme') activeTheme;
  @Output() activeThemeClass: string;
  themes: Array<string>;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.activeTheme.subscribe((theme: string) => {
      this.activeThemeClass = theme;
    });
    this.activateLeftScreen();
  }

  activateLeftScreen() {
    this.isLeftScreenActive = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const key = event.key;

    if (key === 'q') {
      this.switchTheme();
    }

    if (key === 'Tab') {
      this.switchScreen();
    }
    this.isLeftScreenActive ? this.passEventToLeftScreen(event) : this.passEventToRightScreen(event);
  }

  passEventToLeftScreen(event) {
    this.leftScreenEvent = event;
  }

  passEventToRightScreen(event) {
    this.rightScreenEvent = event;
  }

  switchScreen() {
    this.isLeftScreenActive = !this.isLeftScreenActive;
  }

  switchTheme() {
    this.ngRedux.dispatch({type: SWITCH_THEME});
  }
}
