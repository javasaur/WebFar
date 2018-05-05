import { Component, OnInit, Input } from '@angular/core';
import { File } from '../file';

@Component({
  selector: 'app-sumstats',
  templateUrl: './sumstats.component.html',
  styleUrls: ['./sumstats.component.css']
})
export class SumstatsComponent implements OnInit {
  @Input() currentFolder: File;
  fileNum = 0;
  folderNum = 0;
  sizeSum = 0;

  calculateStats(): void {
    for (let i = 0; i < this.currentFolder.children.length; i++) {
      const f = this.currentFolder.children[i];
      if (f.type === 'folder') {
        this.folderNum++;
      } else {
        this.fileNum++;
      }
      this.sizeSum += f.size;
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.calculateStats();
  }
}

