import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgactionsComponent } from './bgactions.component';

describe('BgactionsComponent', () => {
  let component: BgactionsComponent;
  let fixture: ComponentFixture<BgactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
