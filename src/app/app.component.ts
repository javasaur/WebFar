import { Component, OnInit, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  constructor() {
    this.themes = ['classic', 'dark'];
  }

  @Output() isLeftScreenActive: boolean;
  @Output() leftScreenEvent: any;
  @Output() rightScreenEvent: any;
  activeTheme: string;
  themes: Array<string>;
  title = 'WebFar';

  activateLeftScreen() {
    this.isLeftScreenActive = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();

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
    const ind = this.themes.indexOf(this.activeTheme);
    const newInd = ind >= this.themes.length - 1 ? 0 : ind + 1;
    this.activeTheme = this.themes[newInd];
  }

  ngOnInit() {
    this.activeTheme = 'classic';
    this.activateLeftScreen();
  }
}
