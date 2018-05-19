import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileBuilder } from './filebuilder';

@Injectable({
  providedIn: 'root'
})

export class FilesService {

  constructor(private http: HttpClient) {
  }

  public fileState;
  public path;
  public stateLoaded = false;

  public async UpdateFileState(toFile) {
    // let prevParent;
    const res = [];
    console.log('called');
    if (!this.stateLoaded) {
      console.log('state before:', this.stateLoaded);
      let f, filePath, fileName;
      if (!this.path) {
        const file = this.getRoot().then((rootObj: any) => {
          fileName = filePath = this.path = rootObj.root;
          f = new FileBuilder()
            .type('folder')
            .name(fileName)
            .path(filePath)
            .hasParent(false)
            .build();
          // prevParent = f;
          return f;
        });

        await file;
      }

      if (toFile) {
        f = toFile;
        console.log('toFile: ', toFile);
        console.log('path: ', this.path);
      }

      const content = this.getContentOfDir(this.path).then((subfolders: Array<any>) => {
        // console.log('subfolders: ', subfolders);
        subfolders.forEach(subfolder => {
          let extension;
          const split = subfolder.filename.split('.');
          if (split.length > 1) {
            extension = split[split.length - 1];
          } else {
            extension = '';
          }
          if (!!extension) {
            subfolder.filename = subfolder.filename.slice(0, -extension.length - 1);
          }
          const f1 = new FileBuilder()
            .type('folder')
            .name(subfolder.filename)
            .extension(extension)
            .size(subfolder.stats.size)
            .modifiedDate(subfolder.stats.mTime)
            .path(subfolder.path)
            .hasParent(true)
            .build();
          res.push(f1);
        });

        // if (!!prevParent) {
        //   res.unshift(prevParent);
        // }
        // res.unshift(null);
        f.children = res;
        console.log(f);
        this.fileState = f;
      });

      await content;

      const parent = this.getParentOfDir(f.path).then((data: any) => {
        console.log(data);
        if (!!data.parent) {
          res.unshift(new FileBuilder()
            .type('folder')
            .name('..')
            .path(data.parent)
            .build());
        }
      });

      await parent;

      this.stateLoaded = true;
      console.log('state after:', this.stateLoaded);
      return f;
    }
  }

  public getRoot() {
    return this.http.get('http://localhost:3000/root').toPromise();
  }

  public getContentOfDir(dir) {
    const body = {
      path: dir
    };
    return this.http.post('http://localhost:3000/folder', body).toPromise();
  }

  public getParentOfDir(dir) {
    const body = {
      path: dir
    };
    return this.http.post('http://localhost:3000/parent', body).toPromise();
  }
}
