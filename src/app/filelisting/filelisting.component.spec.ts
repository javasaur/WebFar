import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilelistingComponent } from './filelisting.component';

describe('FilelistingComponent', () => {
  let component: FilelistingComponent;
  let fixture: ComponentFixture<FilelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
