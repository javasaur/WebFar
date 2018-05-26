import { File } from './file.model';
import { AssertionError } from 'assert';

export class FileBuilder {
  constructor() {
    this._type = '';
    this._name = '';
    this._extension = '';
    this._size = 0;
    this._children = [];
    this._modifiedDate = 0;
    this._path = '';
  }

  // File fields
  private _type: string;
  private _name: string;
  private _extension: string;
  private _size: number;
  private _children: File[];
  private _modifiedDate: number;
  private _path: string;
  private _hasParent: boolean;

  public build() {
    if (this._type === '') {
      throw new AssertionError(`Type of file can't be empty.`);
    }

    if (this._path === '') {
      throw new AssertionError(`Path can't be empty`);
    }

    return new File(
      this._type,
      this._name,
      this._extension,
      this._size,
      this._children,
      this._modifiedDate,
      this._path,
      this._hasParent);
  }

  public children(c: File[]) {
    this._children = c;
    return this;
  }

  public extension(e: string) {
    this._extension = e;
    return this;
  }

  public hasParent(p: boolean) {
    this._hasParent = p;
    return this;
  }

  public modifiedDate(m: number) {
    this._modifiedDate = m;
    return this;
  }

  public name(n: string) {
    this._name = n;
    return this;
  }

  public path(p: string) {
    this._path = p;
    return this;
  }

  public size(s: number) {
    this._size = s;
    return this;
  }

  public type(t: string) {
    this._type = t;
    return this;
  }
}
