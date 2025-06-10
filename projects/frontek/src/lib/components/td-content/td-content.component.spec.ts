import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdContentComponent } from './td-content.component';

describe('TdContentComponent', () => {
  let component: TdContentComponent;
  let fixture: ComponentFixture<TdContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
