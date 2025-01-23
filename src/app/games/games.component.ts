import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {GamesService} from './games.service';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {Device, GameDetail, GameSearchItem, PaginatedSearchResult, Sort} from './game-search-result.model';
import {combineLatest, debounceTime, map, Observable, scan, shareReplay, startWith, switchMap, tap } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { MatTableModule} from '@angular/material/table';
import { InfiniteScrollComponent } from "../infinite-scroll/infinite-scroll.component";
import { GameStore } from './game.store';
@Component({
  selector: 'app-games',
  imports: [
    AsyncPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgOptimizedImage,
    MatTooltip,
    MatProgressSpinner,
    MatTableModule,
    DatePipe,
    InfiniteScrollComponent
],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  providers: [GamesService]
})
export class GamesComponent implements OnInit {
  private _gameStore: GameStore = inject(GameStore);
  private _gamesService: GamesService = inject(GamesService);
  private firstPageNumber: number = 1;
  public devices$: Observable<Device[]> = this._gamesService.getDevices$();
  public selectedGame$: Observable<GameDetail | undefined> = this._gameStore.getCurrentGame$();
  public searchControl: FormControl = new FormControl<string>('',);
  public deviceControl: FormControl = new FormControl<string>('',);
  public sortControl: FormControl = new FormControl({ field: 'release_date_eur', sort: 'DESC' },);
  private _pageS: WritableSignal<number> = signal<number>(this.firstPageNumber);
  private isMaxPage = true;

  public result$: Observable<PaginatedSearchResult<GameSearchItem>> =  toObservable(this._pageS).pipe(
    switchMap( page => {
      const search = this.searchControl.getRawValue();
      const device = this.deviceControl.getRawValue();
      const sort = this.sortControl.getRawValue();
      return this._gamesService.getPaginated$(search, device, sort, page)
    }),
    scan((accumulator, current) => {
      if(this._pageS() > this.firstPageNumber ) {
        accumulator.pagination = current.pagination;
        accumulator.data = accumulator.data.concat(current.data);
        return accumulator;
      }
      return current;
    }),
    tap(result => {
      this.isMaxPage = this._pageS() >= result.pagination.total_pages
    }),
    shareReplay(1)
  );


  public games$: Observable<GameSearchItem[]> = this.result$.pipe(map(result => result.data));

  public ngOnInit(): void {
    this.watchSearchFieldsForReset()
  }

  public fetchMore(): void {
    if(!this.isMaxPage) {
      this._pageS.set(this._pageS() + 1)
    }
  }

  public selectGame(game: GameDetail): void {
    this._gameStore.setGame(game);
  }

  private getValueFromControl$<T>(control: FormControl): Observable<T> {
    return control.valueChanges.pipe(
      startWith(control.value)
    )
  }

  private watchSearchFieldsForReset(): void {
    combineLatest([
      this.getValueFromControl$<string>(this.searchControl),
      this.getValueFromControl$<string>(this.deviceControl),
      this.getValueFromControl$<Sort>(this.sortControl)
    ]).pipe(
      debounceTime(1000/3)
    ).subscribe(_ => {
      console.log('watchSearchFieldsForReset')
      this._pageS.set(this.firstPageNumber)
    })
  }
}
