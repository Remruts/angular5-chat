import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAudioButtonComponent } from './send-audio-button.component';

describe('SendAudioButtonComponent', () => {
  let component: SendAudioButtonComponent;
  let fixture: ComponentFixture<SendAudioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendAudioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendAudioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
