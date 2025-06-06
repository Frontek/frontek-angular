import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveGridComponent } from './grid.component';

describe('ExecutiveGridComponent', () => {
  let component: ExecutiveGridComponent;
  let fixture: ComponentFixture<ExecutiveGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
