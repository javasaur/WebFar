import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomsettingsComponent } from './bottomsettings.component';

describe('BottomsettingsComponent', () => {
  let component: BottomsettingsComponent;
  let fixture: ComponentFixture<BottomsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
