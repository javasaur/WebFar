import { Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import { File } from '../file';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit {
  @Input() currentFolder;
  files: File[];
  @Input() selectedFile: File;
  @Output() selectFileClick: EventEmitter<File> = new EventEmitter<File>();
  selectFile(event, file): void {
    this.selectFileClick.emit(file);
  }
  @Output() openFileClick: EventEmitter<File> = new EventEmitter<File>();
  openFile(event, file): void {
    this.openFileClick.emit(file);
  }
  setFiles() {
    this.files = this.currentFolder.children;
  }
  constructor() {}

  ngOnInit() {
    this.setFiles();
  }
  ngDoCheck() {
    this.setFiles();
  }

}
