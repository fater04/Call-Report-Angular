import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppelComponent } from './detail-appel.component';

describe('DetailAppelComponent', () => {
  let component: DetailAppelComponent;
  let fixture: ComponentFixture<DetailAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAppelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
