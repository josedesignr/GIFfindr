import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientMock } from '../mocks/http-client.mock';

import { GiphyService } from './giphy.service';

describe('GiphyService', () => {
  let service: GiphyService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: HttpClientMock }
      ],
    });
    service = TestBed.inject(GiphyService);
    http = TestBed.inject(HttpClient);

    spyOn(http, 'get').and.returnValue(of({ data: [] }));
  });

  it('should get Trending GIFs', () => {
    service.getTrending();
    expect(http.get).toHaveBeenCalled();
  });

  it('should get GIFs searching by keyword', () => {
    service.searchByKeyword('test');
    expect(http.get).toHaveBeenCalled();
  });

  it('should get only one GIF searching by keyword', () => {
    service.getUniqueGif('test');
    expect(http.get).toHaveBeenCalled();
  });

  it('should get GIF categories', () => {
    service.getCategories();
    expect(http.get).toHaveBeenCalled();
  });
});
