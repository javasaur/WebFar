import { Component, OnInit, DoCheck, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';

import { TimeService } from '../time.service';
import { FilesService } from '../files/files.service';
import { Screen } from '../fs/screen.model';
import { File } from '../files/file.model';
import { FilesActions } from '../store/behavior/files.actions';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss'],
  providers: [FilesService]
})

export class FilelistComponent implements OnInit, DoCheck, OnDestroy {
  // Current filelist and it's content
  currentFolder: File;
  files: File[];
  currentIndex: number; // For up-down navigation
  selectedFile: File;
  currentTime: string;
  lastKeyPressTimestamp = 0; // For correct key-events handling
  openFilesOption$: string;

  // Stats for summary block
  sumStatsFolders: number;
  sumStatsFiles: number;
  sumStatsSize: number;

  // Settings from parent/state
  @Input() themeClass: string;
  @Input() isActiveScreen: boolean;
  @Input() keyEvent: any;
  @Input() screenId: number;
  @select() screens;
  @select() currentPath;
  @select() openFilesOption;


  // Current screen abstraction and related event
  screen: Screen;
  @Output() moveToThisScreen = new EventEmitter<number>();
  subscriptions = [];

  constructor(private timeService: TimeService,
              private filesService: FilesService,
              private filesActions: FilesActions,
              private _router: Router) {
  }

  ngOnInit() {
    this.subscribeToStore();
  }

  ngDoCheck() {
    // Must check because fileState might not be initialized yet
    if (!this.currentFolder) {
      return;
    }
    this.calculateSummaryStats();
    if (this.isActiveScreen) {
      this.reactToKeypress();
      return;
    }

    // Avoid useless operations on nonactive screen
    if (!this.screen.isDeactivated) {
      this.unSelectActiveFile();
      this.zeroCurrIndex();
      this.screen.isDeactivated = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  calculateSummaryStats(): void {
    this.sumStatsFiles = this.sumStatsFolders = this.sumStatsSize = 0;
    const arr = this.currentFolder.children;
    arr.forEach((f) => {
      f.type === 'folder' ? this.sumStatsFolders++ : this.sumStatsFiles++;
      this.sumStatsSize += f.size;
    });
  }

  handleMouseEvent(event, file): void {
    event.preventDefault();

    if (!this.isActiveScreen) {
      this.moveToThisScreen.emit(this.screenId);
    }

    if (event.type === 'click') {
      this.selectFile(file);
      return;
    }

    if (event.type === 'dblclick') {
      this.openFile(file);
      return;
    }
  }

  openFile(file: File): void {
    if (file.isFile()) {
      if (this.openFilesOption$ === 'os') {
        this.filesService.passControlToOS(file);
        return;
      }

      if (this.openFilesOption$ === 'app') {
        this.filesActions.toggleEditorMode();
        this._router.navigateByUrl(`editor?path=${file.path}`);
        return;
      }
    }

    this._router.navigateByUrl(`fs?path=${file.path}`);
  }

  reactToKeypress(): void {
    const e = this.keyEvent;
    if (!e) {
      return;
    }

    // Use timestamp to avoid firing same event twice
    if (e.timeStamp === this.lastKeyPressTimestamp) {
      return;
    }

    switch (e.key) {
      case 'Tab':
        this.setCursorAtFirst();
        break;
      case 'ArrowUp':
        this.traverseUp();
        break;
      case 'ArrowDown':
        this.traverseDown();
        break;
      case 'ArrowLeft':
        this.setCursorAtFirst();
        break;
      case 'ArrowRight':
        this.setCursorAtLast();
        break;
      case 'Enter':
        this.openFile(this.selectedFile);
        break;
      default:
        break;
    }

    this.lastKeyPressTimestamp = e.timeStamp;
  }

  selectFile(file: File): void {
    this.selectedFile = file;
    this.currentIndex = this.files.indexOf(file);
  }

  setClockAndInterval(obj): void {
    obj.currentTime = obj.timeService.getCurrentTime();
    setInterval(function() {
      obj.currentTime = obj.timeService.getCurrentTime();
    }, 60000);
  }

  setCursor(index: number): void {
    this.selectedFile = this.files[index];
    this.currentIndex = index;
  }

  setCursorAtFirst(): void {
    this.setCursor(0);
  }

  setCursorAtLast(): void {
    this.setCursor(this.files.length - 1);
  }

  subscribeToStore() {
    // Filestate is stored per screen, so we subscribe to the screens change
    const sub1 = this.screens.subscribe((screens: Screen[]) => {
      this.screen = [...screens][this.screenId];
      this.currentFolder = this.screen.fileState;
      if (!!this.currentFolder) {
        this.files = this.currentFolder.children;
      }
    });

    // Subscribe to the app current path and update filestate
    const sub2 = this.currentPath.subscribe((path) => {
      // Initial state update or active screen
      if ((this.screen.isActive || !this.screen.isInitialised)) {
        this.filesService.updateFileState(path, this.screenId, this.screen).then(() => {
          if (this.filesService.calls === 1) {
            // First call
            this.setClockAndInterval(this);
            this.calculateSummaryStats();
            if (this.isActiveScreen) {
              this.setCursorAtFirst();
            }
          }
          this.unSelectActiveFile();
          this.setCursorAtFirst();
        });
      }
    });

    const sub3 = this.openFilesOption.subscribe((option) => {
      this.openFilesOption$ = option;
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2, sub3]);
  }

  traverse(num: number): void {
    const newIndex = this.currentIndex + num;
    if (newIndex < 0 || newIndex > this.files.length - 1) {
      return;
    }

    this.currentIndex = newIndex;
    this.setCursor(newIndex);
    this.selectFile(this.files[newIndex]);
  }

  traverseDown(): void {
    this.traverse(1);
  }

  traverseUp(): void {
    this.traverse(-1);
  }

  unSelectActiveFile(): void {
    this.selectedFile = null;
  }

  zeroCurrIndex() {
    this.currentIndex = 0;
  }
}
