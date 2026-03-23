import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMoviesPage } from './tabMovies.page';

describe('TabMoviesPage', () => {
  let component: TabMoviesPage;
  let fixture: ComponentFixture<TabMoviesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TabMoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
