import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Supercooltestingcomponent302vComponent } from './supercooltestingcomponent302v.component';

describe('Supercooltestingcomponent302vComponent', () => {
  let component: Supercooltestingcomponent302vComponent;
  let fixture: ComponentFixture<Supercooltestingcomponent302vComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Supercooltestingcomponent302vComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Supercooltestingcomponent302vComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
