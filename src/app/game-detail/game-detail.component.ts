import {Component, inject, Input, OnInit} from '@angular/core';
import {GamesService} from '../games/games.service';
import {Observable} from 'rxjs';
import {GameDetail} from '../games/game-search-result.model';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-game-detail',
  imports: [
    AsyncPipe,
    MatCardModule,
    NgOptimizedImage,
    DatePipe,
    MatProgressSpinner
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent implements OnInit {
  @Input({required: true}) gameId!: number;
  private _gamesService: GamesService = inject(GamesService);
  public game$!: Observable<GameDetail | undefined>;
  public ngOnInit(): void {
    this.game$= this._gamesService.getSingle$(this.gameId);

  }
}
