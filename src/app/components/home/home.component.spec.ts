import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { GiphyServiceMock } from 'src/app/mocks/giphy-service.mock';
import { GiphyService } from 'src/app/services/giphy.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let giphyService: GiphyService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: GiphyService, useClass: GiphyServiceMock }
      ]
    })
    .compileComponents();

    giphyService = TestBed.inject(GiphyService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spyOn(giphyService, 'getTrending').and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should get Trending GIFs', () => {
    expect(giphyService.getTrending).toHaveBeenCalled();
  });
});
