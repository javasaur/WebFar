import { Component, OnInit, DoCheck, OnChanges, Input } from '@angular/core';
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
  files: File[];
  currentIndex: number;
  res: any;

  currentFolder: File;
  selectedFile: File;
  selectedFileModifiedDate: string;
  currentTime: string;

  sumStatsFolders: number;
  sumStatsFiles: number;
  sumStatsSize: number;
  @Input() themeClass: string;
  @Input() isActiveScreen: boolean;
  @Input() keyEvent: any;
  lastKeyPressTimestamp: number;

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
    if (file.isFile()) {
      console.log('opening: ', file.name);
      this.filesService.passControlToOS(file);
      return;
    }

    this.currentFolder = file;
    this.selectedFile = undefined;
    this.filesService.path = file.path;
    this.filesService.stateLoaded = false;
    this.filesService.UpdateFileState(file).then((data: any) => {
      this.setFiles();
      // this.currentFolder = this.filesService.fileState;
      // this.files = this.currentFolder.children;
    });
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
    const newIndex = this.currentIndex + num;
    // Reached 'top', bounce to bottom
    if (newIndex < 0 || newIndex > this.files.length - 1) {
      return;
    }

    this.currentIndex = newIndex;
    this.setCursor(newIndex);
    this.selectFile(this.files[newIndex]);
  }

  reactToKeypress() {
    const e = this.keyEvent;
    if (!e) {
      return;
    }
    if (e.timeStamp === this.lastKeyPressTimestamp) {
      return;
    }
    console.log(e.key);
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

  constructor(private timeService: TimeService, private filesService: FilesService, private ref: ChangeDetectorRef) {
    this.themeClass = 'classic';
    this.lastKeyPressTimestamp = 0;
  }

  ngOnInit() {
    // console.log('ngOnInit key: ', this.eventKey);
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
    console.log('triggered ngDoCheck');
    this.currentFolder = this.filesService.fileState;
    this.files = this.currentFolder.children;
    this.calculateStats();
    this.convertTimestamp();
    // console.log('inside ngDoCheck: ', this.eventKey);
    if (this.isActiveScreen) {
      this.reactToKeypress();
    } else {
      this.unSelectFiles();
    }
  }
}
