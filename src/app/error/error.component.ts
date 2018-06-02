import { Component, Input, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

import { FilesActions } from '../store/behavior/files.actions';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() themeClass: string;
  path$: string;
  @select() currentPath;
  @select() activeTheme;
  activeTheme$: string;

  constructor(private filesActions: FilesActions) { }

  ngOnInit() {
    this.currentPath.subscribe((path) => {
      this.path$ = path;
    });

    this.activeTheme.subscribe((theme) => {
      this.activeTheme$ = theme;
    });
  }

  togglePathError() {
    this.filesActions.togglePathError();
  }
}
