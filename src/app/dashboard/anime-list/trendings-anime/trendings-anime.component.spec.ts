import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingsAnimeComponent } from './trendings-anime.component';

describe('TrendingsAnimeComponent', () => {
  let component: TrendingsAnimeComponent;
  let fixture: ComponentFixture<TrendingsAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingsAnimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingsAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
