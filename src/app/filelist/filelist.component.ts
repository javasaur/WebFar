import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { File } from '../file';
import { mockFile } from '../mock-files';
import {TimeService} from '../time.service';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.scss', './themes/classic.scss', './themes/dark.scss']
})
export class FilelistComponent implements OnInit, DoCheck {
  files: File[];
  currentIndex: number;

  currentFolder: File;
  selectedFile: File;
  selectedFileModifiedDate: string;
  currentTime: string;

  sumStatsFolders: number;
  sumStatsFiles: number;
  sumStatsSize: number;
  @Input() themeClass: string;
  @Input() isActiveScreen: boolean;
  @Input() eventKey: string;

  setFiles() {
    this.files = this.currentFolder.children;
    this.currentIndex = 0;
  }

  setCurrentTime(obj): void {
    obj.currentTime = obj.timeService.getCurrentTime();
    setInterval(function() {
      obj.currentTime = obj.timeService.getCurrentTime();
    }, 60000);
  }

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

  selectFile(file: File) {
    this.selectedFile = file;
    this.currentIndex = this.files.indexOf(file);
  }

  openFile(file: File) {
    this.currentFolder = file;
    this.selectedFile = undefined;
    this.setFiles();
  }

  setCursor(index: number) {
    this.selectedFile = this.files[index];
  }

  unSelectFiles() {
    this.selectedFile = null;
    this.currentIndex = 0;
  }

  traverseUp() {
    this.traverse(-1);
  }

  traverseDown() {
    this.traverse(1);
  }

  traverse(num: number) {
    let newIndex = this.currentIndex + num;
    // Reached 'top', bounce to bottom
    if (newIndex < 0) {
      newIndex = this.files.length - 1;
    } else if (newIndex > this.files.length - 1) {
      // Reached 'bottom', bounce to top
      newIndex = 0;
    }

    this.currentIndex = newIndex;
    this.setCursor(newIndex);
    this.selectFile(this.files[newIndex]);
  }

  reactToKeypress() {
    const key = this.eventKey;
    switch (key) {
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
  }

  constructor(private timeService: TimeService) {
    this.themeClass = 'classic';
  }

  ngOnInit() {
    this.currentFolder = mockFile;
    this.setCurrentTime(this);
    this.calculateStats();
    this.convertTimestamp();
    this.setFiles();
    if(this.isActiveScreen) {
      this.setCursor(0);
    }
  }

  ngDoCheck() {
    this.calculateStats();
    this.convertTimestamp();
    if (this.isActiveScreen) {
      this.reactToKeypress();
    } else {
      this.unSelectFiles();
    }
  }
}
