import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppelComponent } from './list-appel.component';

describe('ListAppelComponent', () => {
  let component: ListAppelComponent;
  let fixture: ComponentFixture<ListAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
