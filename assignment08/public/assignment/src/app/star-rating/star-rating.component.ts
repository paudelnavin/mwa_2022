import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  stars: number[] = [];
  @Input()
  set rating(rating: number) {
    this.stars = new Array<number>(rating);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
