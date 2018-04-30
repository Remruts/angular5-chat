import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSortingComponent } from './chat-sorting.component';

describe('ChatSortingComponent', () => {
  let component: ChatSortingComponent;
  let fixture: ComponentFixture<ChatSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
