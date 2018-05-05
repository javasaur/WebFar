import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionstatsComponent } from './optionstats.component';

describe('OptionstatsComponent', () => {
  let component: OptionstatsComponent;
  let fixture: ComponentFixture<OptionstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
