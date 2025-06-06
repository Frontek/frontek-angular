import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontekComponent } from './frontek.component';

describe('FrontekComponent', () => {
  let component: FrontekComponent;
  let fixture: ComponentFixture<FrontekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
