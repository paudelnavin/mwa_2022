import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../game-service.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game!: Game;
  constructor(private route: ActivatedRoute, private gameService: GamesDataService, private _router:Router) {
    this.game = new Game("","", 0);
   }

  gameId = this.route.snapshot.params["gameId"];
  ngOnInit(): void {
    this.gameService.getGame(this.gameId).subscribe(game => {this.game = game;});
  }

  onDelete():void{
    this.gameService.deleteGame(this.gameId).subscribe(game => {this.game = game;});
    this._router.navigate(["games"]);
   }
}
