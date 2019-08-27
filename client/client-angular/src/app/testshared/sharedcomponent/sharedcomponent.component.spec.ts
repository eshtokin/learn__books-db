import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedcomponentComponent } from './sharedcomponent.component';

describe('SharedcomponentComponent', () => {
  let component: SharedcomponentComponent;
  let fixture: ComponentFixture<SharedcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
