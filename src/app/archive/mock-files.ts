import { File } from '../files/file.model';
import { FileBuilder } from '../files/filebuilder';

const parent = new FileBuilder()
  .type('folder')
  .name('My images')
  .build();

const child1 = new FileBuilder()
  .type('folder')
  .name('My documents')
  .size(1145)
  .modifiedDate(1525361969)
  .build();

const grandchild = new FileBuilder()
  .type('file')
  .name('Some_doc')
  .extension('txt')
  .size(1122)
  .modifiedDate(1525966907892)
  .build();

const child2 = new FileBuilder()
  .type('file')
  .name('img01')
  .extension('jpg')
  .size(11453)
  .modifiedDate(1525361969)
  .build();

const child3 = new FileBuilder()
  .type('file')
  .name('img02')
  .extension('png')
  .size(12344)
  .modifiedDate(1525361969)
  .build();

parent.children = [child1, child2, child3];
child1.children = [grandchild];

export const mockFile: File = parent;
