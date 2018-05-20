import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { File } from '../file';
import {TimeService} from '../time.service';
import {FilesService} from '../files.service';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.scss', './themes/classic.scss', './themes/dark.scss'],
  providers: [FilesService]
})

export class FilelistComponent implements OnInit, DoCheck {
  constructor(private timeService: TimeService, private filesService: FilesService, private ref: ChangeDetectorRef) {
    this.themeClass = 'classic';
    this.lastKeyPressTimestamp = 0;
  }

  // Current folder and it's content
  currentFolder: File;
  files: File[]; // files list
  currentIndex: number; // For up-down navigation

  selectedFile: File;
  selectedFileModifiedDate: string;

  // Other
  currentTime: string; // formatted timestamp
  lastKeyPressTimestamp: number;

  // summarized stats
  sumStatsFolders: number;
  sumStatsFiles: number;
  sumStatsSize: number;

  // triggers from main screen
  @Input() themeClass: string;
  @Input() isActiveScreen: boolean;
  @Input() keyEvent: any;

  calculateStats(): void {
    this.sumStatsFiles = this.sumStatsFolders = this.sumStatsSize = 0;
    for (let i = 0; i < this.currentFolder.children.length; i++) {
      const f = this.currentFolder.children[i];
      if (f.type === 'folder') {
        this.sumStatsFolders++;
      } else {
        this.sumStatsFiles++;
      }
      this.sumStatsSize += f.size;
    }
  }

  convertTimestamp() {
    if (!!this.selectedFile) {
      this.selectedFileModifiedDate = this.timeService.convertTimestamp(this.selectedFile.modifiedDate);
    }
  }

  openFile(file: File) {
    if (file.isFile()) {
      this.filesService.passControlToOS(file);
      return;
    }

    this.currentFolder = file;
    this.selectedFile = undefined;
    this.filesService.path = file.path;
    this.filesService.stateLoaded = false;
    this.filesService.UpdateFileState(file).then((data: any) => {
      this.setFiles();
      this.setCursor(0);
    });
  }

  reactToKeypress() {
    const e = this.keyEvent;
    if (!e) {
      return;
    }
    if (e.timeStamp === this.lastKeyPressTimestamp) {
      return;
    }
    switch (e.key) {
      // Unset the position only if switched screen
      case 'ArrowLeft':
      case 'ArrowRight':
        this.setCursor(0);
        break;
      case 'ArrowUp':
        this.traverseUp();
        break;
      case 'ArrowDown':
        this.traverseDown();
        break;
      case 'Enter':
        this.openFile(this.selectedFile);
        break;
      default:
        break;
    }
    this.lastKeyPressTimestamp = e.timeStamp;
  }

  selectFile(file: File) {
    this.selectedFile = file;
    this.currentIndex = this.files.indexOf(file);
  }

  setCurrentTime(obj): void {
    obj.currentTime = obj.timeService.getCurrentTime();
    setInterval(function() {
      obj.currentTime = obj.timeService.getCurrentTime();
    }, 60000);
  }

  setCursor(index: number) {
    this.selectedFile = this.files[index];
  }

  setFiles() {
    this.files = this.currentFolder.children;
    this.currentIndex = 0;
  }

  traverse(num: number) {
    const newIndex = this.currentIndex + num;
    // Reached 'top', bounce to bottom
    if (newIndex < 0 || newIndex > this.files.length - 1) {
      return;
    }

    this.currentIndex = newIndex;
    this.setCursor(newIndex);
    this.selectFile(this.files[newIndex]);
  }

  traverseDown() {
    this.traverse(1);
  }

  traverseUp() {
    this.traverse(-1);
  }

  unSelectFiles() {
    this.selectedFile = null;
    this.currentIndex = 0;
  }

  ngOnInit() {
      this.filesService.UpdateFileState(null).then(() => {
        this.currentFolder = this.filesService.fileState;
        this.setCurrentTime(this);
        this.calculateStats();
        this.convertTimestamp();
        this.setFiles();
        if (this.isActiveScreen) {
          this.setCursor(0);
        }
      });
  }

  ngDoCheck() {
    this.currentFolder = this.filesService.fileState;
    // Prevent calls if state is still not loaded
    if (this.currentFolder !== undefined) {
      this.files = this.currentFolder.children;
      this.calculateStats();
      this.convertTimestamp();
      if (this.isActiveScreen) {
        this.reactToKeypress();
      } else {
        this.unSelectFiles();
      }
    }
  }
}
