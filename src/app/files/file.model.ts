export class File {
  constructor(type, name, extension, size, children, modifiedDate, path, hasParent) {
    this._type = type;
    this._name = name;
    this._extension = extension;
    this._size = size;
    this._children = children;
    this._modifiedDate = modifiedDate;
    this._path = path;
    this._hasParent = hasParent;
  }

  private _type: string;
  private _name: string;
  private _extension: string;
  private _size: number;
  private _children: File[];
  private _modifiedDate: number;
  private _path: string;
  private _hasParent: boolean

  public isFolder(): boolean {
    return this.type === 'folder';
  }

  public isFile(): boolean {
    return this._type === 'file';
  }

  get hasParent(): boolean {
    return this._hasParent;
  }

  set hasParent(value: boolean) {
    this._hasParent = value;
  }

  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get extension(): string {
    return this._extension;
  }

  set extension(value: string) {
    this._extension = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  public get children(): File[] {
    return this._children;
  }

  public set children(value: File[]) {
    this._children = value;
  }

  get modifiedDate(): number {
    return this._modifiedDate;
  }

  set modifiedDate(value: number) {
    this._modifiedDate = value;
  }
}
