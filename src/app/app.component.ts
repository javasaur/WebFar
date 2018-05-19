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
  // @Output() rightScreenEventKey: string;
  // @Output() leftScreenEventKey: string;
  @Output() isLeftScreenActive: boolean;
  @Output() leftScreenEvent: any;
  @Output() rightScreenEvent: any;
  activeTheme: string;
  themes: Array<string>;
  title = 'WebFar';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(typeof event.timeStamp);
    console.log('passing key: ', event.key);
    const key = event.key;

    if (key === 'q') {
      this.switchTheme();
    }

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      this.switchScreen();
    }
    // this.isLeftScreenActive ? this.setEventToLeftScreen(key) : this.setEventToRightScreen(key);
    this.isLeftScreenActive ? this.passEventToLeftScreen(event) : this.passEventToRightScreen(event);
  }

  passEventToLeftScreen(event) {
    this.leftScreenEvent = event;
  }

  passEventToRightScreen(event) {
    this.rightScreenEvent = event;
  }

  // setEventToLeftScreen(eventKey) {
  //   console.log('passing to left screen: ', eventKey);
  //   this.leftScreenEventKey = eventKey;
  //   this.rightScreenEventKey = null;
  // }

  // setEventToRightScreen(eventKey) {
  //   this.rightScreenEventKey = eventKey;
  //   this.leftScreenEventKey = null;
  // }

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
