import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivercitiesComponent } from './univercities.component';

describe('UnivercitiesComponent', () => {
  let component: UnivercitiesComponent;
  let fixture: ComponentFixture<UnivercitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnivercitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnivercitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
