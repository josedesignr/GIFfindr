import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gifs-panel',
  templateUrl: './gifs-panel.component.html'
})
export class GifsPanelComponent {
  @Input() gifs: any[] = [];

  constructor() { }
}
