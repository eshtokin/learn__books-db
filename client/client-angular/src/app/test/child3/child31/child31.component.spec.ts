import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Child31Component } from './child31.component';

describe('Child31Component', () => {
  let component: Child31Component;
  let fixture: ComponentFixture<Child31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Child31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Child31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
