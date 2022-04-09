import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlatsComponent } from './liste-plats.component';

describe('ListePlatsComponent', () => {
  let component: ListePlatsComponent;
  let fixture: ComponentFixture<ListePlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePlatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
