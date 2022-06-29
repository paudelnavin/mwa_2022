import { Component, OnInit } from '@angular/core';
import { AdrienTrackService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  adrienTracks:any[]=[];
  constructor(private _adrienService:AdrienTrackService) { }
  
  ngOnInit(): void {
    this._adrienService.getTracks().subscribe({
      next:(result) => {this.adrienTracks = result},
    });
  }

}
