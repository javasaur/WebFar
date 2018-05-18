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
  @Output() rightScreenEventKey: string;
  @Output() leftScreenEventKey: string;
  @Output() isLeftScreenActive: boolean;
  @Output() activeTheme: string;
  themes: Array<string>;
  title = 'WebFar';

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'q') {
      this.switchTheme();
      console.log('q');
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.switchScreen();
    }
    this.isLeftScreenActive ? this.setEventToLeftScreen(key) : this.setEventToRightScreen(key);
  }

  setEventToLeftScreen(eventKey) {
    this.leftScreenEventKey = eventKey;
    this.rightScreenEventKey = null;
  }

  setEventToRightScreen(eventKey) {
    this.rightScreenEventKey = eventKey;
    this.leftScreenEventKey = null;
  }

  activateLeftScreen() {
    this.isLeftScreenActive = true;
  }

  switchTheme() {
    const ind = this.themes.indexOf(this.activeTheme);
    const newInd = ind >= this.themes.length - 1 ? 0 : ind + 1;
    this.activeTheme = this.themes[newInd];
  }

  switchScreen() {
    this.isLeftScreenActive = !this.isLeftScreenActive;
  }

  ngOnInit() {
    this.activeTheme = 'classic';
    this.activateLeftScreen();
  }
}
