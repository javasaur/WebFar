import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/state/IAppState';
import { FilesActions } from '../store/behavior/files.actions';
import { ScreenActions } from '../store/behavior/screen.actions';
import { FileBuilder } from './filebuilder';

@Injectable({
  providedIn: 'root'
})

export class FilesService {
  private path: string;
  private _calls = 0;

  get calls(): number {
    return this._calls;
  }

  constructor(private http: HttpClient,
              private store: NgRedux<IAppState>,
              private filesActions: FilesActions,
              private screenActions: ScreenActions) {
  }

  public getContentOfDir(path) {
    const body = {
      path: path
    };
    return this.http.post('http://localhost:3000/folder', body).toPromise();
  }

  public getContentOfFile(path) {
    const body = {
      path: path
    };
    return this.http.post('http://localhost:3000/content', body).toPromise();
  }

  public getParentOfDir(path) {
    const body = {
      path: path
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

  public async updateFileState(toFile, screenId, screen) {
    // Don't start load if got path error
    if (this.store.getState().pathError) {
      return;
    }

    if  (!!this.path) {
      this.path = (typeof toFile === 'object') ? toFile.path : toFile;
    }

    try {
      const res = [];
      let file, filePath, fileName;

      // Initial load, get the root
      if (toFile === 'root') {
        const fetchRoot = this.getRoot()
          .then((rootObj: any) => {
            fileName = filePath = this.path = rootObj.root;
            file = new FileBuilder()
              .type('folder')
              .name(fileName)
              .path(filePath)
              .hasParent(false)
              .build();
            return file;
          });

        await fetchRoot;
      }

      // Expansion/folding of folder
      if (toFile !== 'root') {
        if (typeof toFile === 'object') {
          file = toFile;
        } else {
          file = new FileBuilder()
            .type('folder')
            .name(toFile)
            .path(toFile)
            .build();
        }
      }

      // Get contents of the folder and push it to an array
      const fetchContent = this.getContentOfDir(file.path)
        .then((subfolders: Array<any>) => {
          subfolders.forEach(subfolder => {
            // Parse extension
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

            // Add the created file to result
            res.push(
              new FileBuilder()
                .type(subfolder.type)
                .name(subfolder.filename)
                .extension(extension)
                .size(subfolder.stats.size)
                .modifiedDate(subfolder.stats.mtime)
                .path(subfolder.path)
                .hasParent(true)
                .build()
            );
          });

          file.children = res;
        });

      await fetchContent;

      // If the target folder has a parent, add it as a first element to the array
      const fetchParent = this.getParentOfDir(file.path)
        .then((data: any) => {
          if (!!data.parent) {
            res.unshift(new FileBuilder()
              .type('folder')
              .name('..')
              .path(data.parent)
              .build());
          }
        });

      await fetchParent;

      if (!screen.isInitialised) {
        this.screenActions.initializeScreen(screenId);
      }
      this.filesActions.updateFileState(screenId, file);
    } catch (err) {
      this.filesActions.togglePathError();
    }


  }
}
