import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFrontComponent } from './post-front.component';

describe('PostFrontComponent', () => {
  let component: PostFrontComponent;
  let fixture: ComponentFixture<PostFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
