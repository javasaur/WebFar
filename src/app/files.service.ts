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

  public getRoot() {
    return this.http.get('http://localhost:3000/root').toPromise();
  }

  public async passControlToOS(file) {
    const body = {
      path: file.path
    };
    return this.http.post('http://localhost:3000/file', body).toPromise();
  }

  public async UpdateFileState(toFile) {
    const res = [];
    if (!this.stateLoaded) {
      let f, filePath, fileName;

      // Initial load, get the root
      if (!this.path) {
        const file = this.getRoot().then((rootObj: any) => {
          fileName = filePath = this.path = rootObj.root;
          f = new FileBuilder()
            .type('folder')
            .name(fileName)
            .path(filePath)
            .hasParent(false)
            .build();
          return f;
        });

        await file;
      }

      // Expansion/folding of folder
      if (toFile) {
        f = toFile;
      }

      // Get contents of the folder and push it to an array
      const content = this.getContentOfDir(this.path).then((subfolders: Array<any>) => {
        subfolders.forEach(subfolder => {
          let extension;
          const split = subfolder.filename.split('.');
          if (split.length > 1) {
            extension = split[split.length - 1];
          } else {
            extension = '';
          }
          // If extension is present, cut it from the filename
          if (!!extension) {
            subfolder.filename = subfolder.filename.slice(0, -extension.length - 1);
          }
          const f1 = new FileBuilder()
            .type(subfolder.type)
            .name(subfolder.filename)
            .extension(extension)
            .size(subfolder.stats.size)
            .modifiedDate(subfolder.stats.mtime)
            .path(subfolder.path)
            .hasParent(true)
            .build();
          res.push(f1);
        });



        f.children = res;
        this.fileState = f;
      });

      await content;

      // If the target folder has a parent, add it as a first element to the array
      const parent = this.getParentOfDir(f.path).then((data: any) => {
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
      return f;
    }
  }
}
