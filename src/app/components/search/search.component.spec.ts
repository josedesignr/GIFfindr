import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { categoriesResponseMock } from 'src/app/mocks/categories.mock';
import { GiphyServiceMock } from 'src/app/mocks/giphy-service.mock';
import { RouterMock } from 'src/app/mocks/router.mock';
import { uniqueGifResponseMock } from 'src/app/mocks/unique-gif-response.mock';
import { GiphyService } from 'src/app/services/giphy.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let giphyService: GiphyService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchComponent],
      providers: [
        { provide: GiphyService, useClass: GiphyServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ keyword: 'test' })
            }
          }
        }
      ]
    })
    .compileComponents();

    route = TestBed.inject(ActivatedRoute);
    giphyService = TestBed.inject(GiphyService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    spyOn(giphyService, 'getCategories').and.returnValue(of(categoriesResponseMock));
    spyOn(giphyService, 'searchByKeyword').and.returnValue(of([]));
    spyOn(giphyService, 'getUniqueGif').and.returnValue(of(uniqueGifResponseMock));
    fixture.detectChanges();
  });

  it('should get GIF Categories', () => {
    expect(giphyService.getCategories).toHaveBeenCalled();
  });

  it('should search by Keyword in route as param', () => {
    expect(giphyService.searchByKeyword).toHaveBeenCalledWith(component.keyword);
    expect(giphyService.getUniqueGif).toHaveBeenCalledWith(component.keyword);
  });

  it('should select Category', () => {
    component.selectCategory(1);
    expect(component.subcategories).toBe(component.categories[1].subcategories);
    expect(component.activeCategory).toBe(1);
  });

  it('should search by Category', () => {
    component.searchByCategory('animals');
    expect(giphyService.searchByKeyword).toHaveBeenCalledWith('animals');
    expect(giphyService.getUniqueGif).toHaveBeenCalledWith('animals');
  });

});
