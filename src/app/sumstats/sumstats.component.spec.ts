import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumstatsComponent } from './sumstats.component';

describe('SumstatsComponent', () => {
  let component: SumstatsComponent;
  let fixture: ComponentFixture<SumstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
