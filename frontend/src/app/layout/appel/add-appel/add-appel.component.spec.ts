import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppelComponent } from './add-appel.component';

describe('AddAppelComponent', () => {
  let component: AddAppelComponent;
  let fixture: ComponentFixture<AddAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
