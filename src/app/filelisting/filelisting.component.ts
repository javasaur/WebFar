import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { mockFile } from '../mock-files';

@Component({
  selector: 'app-filelisting',
  templateUrl: './filelisting.component.html',
  styleUrls: ['./filelisting.component.css']
})
export class FilelistingComponent implements OnInit {
  currentFolder: File;
  selectedFile: File;
  handLeSelectFile(file: File) {
    this.selectedFile = file;
  }
  handleOpenFile(file: File) {
    this.currentFolder = file;
    this.selectedFile = undefined;
  }
  constructor() { }

  ngOnInit() {
    this.currentFolder = mockFile;
  }

}
