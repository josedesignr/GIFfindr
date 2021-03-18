import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trendingGifs: any[] = [];

  constructor(private giphyService: GiphyService) { }

  ngOnInit(): void {
    this.giphyService.getTrending().subscribe((data) => {
      this.trendingGifs = data;
    });
  }

}
