import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailMoviePage } from './detail-movie.page';

describe('DetailMoviePage', () => {
  let component: DetailMoviePage;
  let fixture: ComponentFixture<DetailMoviePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
