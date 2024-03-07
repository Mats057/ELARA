import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneItemComponent } from './one-item.component';

describe('OneItemComponent', () => {
  let component: OneItemComponent;
  let fixture: ComponentFixture<OneItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneItemComponent]
    });
    fixture = TestBed.createComponent(OneItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
