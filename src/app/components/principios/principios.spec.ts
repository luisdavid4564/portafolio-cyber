import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Principios } from './principios';

describe('Principios', () => {
  let component: Principios;
  let fixture: ComponentFixture<Principios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Principios],
    }).compileComponents();

    fixture = TestBed.createComponent(Principios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
