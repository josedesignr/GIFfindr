import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword: any;
  searchResult: any[] | undefined ;
  uniqueGif: any;
  categories: any[] = [];
  subcategories: any[] = [];
  activeCategory: number | undefined;
  resultSentence: string = 'Go ahead and search for something!';
  resultSubsentence: string = '...meanwhile, this is a totally random selection';
  constructor(private route: ActivatedRoute, private giphyService: GiphyService, private router: Router) { }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.paramMap.get('keyword');
    if (this.keyword) {
      this.resultSentence = 'This is our best result!';
      this.resultSubsentence = '...but you may also like one of these:';
    }

    this.searchGifs(this.keyword);

    this.giphyService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  selectCategory(index: number) {
    this.subcategories = this.categories[index].subcategories;
    this.activeCategory = index;
  }

  searchByCategory(category: string) {
    this.router.navigate(['search', category]);
    this.searchResult = undefined;
    this.uniqueGif = null;
    this.searchGifs(category);
  }

  private searchGifs(keyword: string): void {
    this.giphyService.searchByKeyword(keyword).subscribe((data) => {
      this.searchResult = data;
    });

    this.giphyService.getUniqueGif(keyword).subscribe((data) => {
      this.uniqueGif = data;
    });
  }

}
