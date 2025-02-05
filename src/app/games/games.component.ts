import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from './games.service';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {Device, GameDetail, GameSearchItem, PaginatedSearchResult, Sort} from './game-search-result.model';
import {BehaviorSubject, combineLatest, debounceTime, filter, map, Observable, scan, shareReplay, skip, startWith, switchMap, takeUntil, tap } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { MatTableModule} from '@angular/material/table';
import { InfiniteScrollComponent } from "../infinite-scroll/infinite-scroll.component";
import { GameStore } from './game.store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
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
export class GamesComponent implements OnInit, OnDestroy {
  // Dependency Injection
  private _gameStore: GameStore = inject(GameStore);
  private _gamesService: GamesService = inject(GamesService);

  // private variables usefull to the behavior of the table
  private firstPageNumber: number = 1;
  private _page$: BehaviorSubject<number> = new BehaviorSubject<number>(this.firstPageNumber);
  private isMaxPage = true;
  private destroy$ = new BehaviorSubject<boolean>(false);

  // variables used for the display
  /**
   * feeds the select of devices
   */
  public devices$: Observable<Device[]> = this._gamesService.getDevices$();
  /**
   * relies on the store to know which game is currently selected
   */
  public selectedGame$: Observable<GameDetail | undefined> = this._gameStore.getCurrentGame$();

  // controls used for the table filters
  public searchControl: FormControl = new FormControl<string>('',);
  public deviceControl: FormControl = new FormControl<string>('',);
  public sortControl: FormControl = new FormControl({ field: 'release_date_eur', sort: 'DESC' },);

  /**
   * result object from the api, contains information about global search totals 
   * and the list of items we have retrieved so far
   */
  public result$: Observable<PaginatedSearchResult<GameSearchItem>> =  this._page$.asObservable().pipe(
    // when the page$ emits an event, it means we need to refresh teh table content
    switchMap( page => {
      console.group('updateResults');
      console.log('page', page);
      const search = this.searchControl.getRawValue();
      const device = this.deviceControl.getRawValue();
      const sort = this.sortControl.getRawValue();
      console.log('search', search);
      console.log('device', device);
      console.log('sort', sort);
      console.groupEnd()
      // we trigger a call to the https://www.mariouniversalis.fr/graphql/
      return this._gamesService.getPaginated$(search, device, sort, page)
    }),
    // scan allows us to get the last value we had in our pipe alonside the new one
    // allowing us to react accordingly depending on the situation
    scan((accumulator, current) => {
      console.log('let us accumulate')
      // here, if we are not on the first page, it means we just want to add new values to our table
      accumulator.pagination = current.pagination;
      accumulator.data = this._page$.value > this.firstPageNumber ? 
        accumulator.data.concat(current.data):
        current.data;
      return accumulator;
    }),
    tap(result => {
      this.isMaxPage = this._page$.value >= result.pagination.total_pages
    }),
    shareReplay(1)
  );


  /**
   * this is a "simplyfied" version of our result where only the list of items we want to display is returned
   */
  public games$: Observable<GameSearchItem[]> = this.result$.pipe(map(result => result.data));

  public ngOnInit(): void {
    this.destroy$.next(false);
    this.watchSearchFieldsForReset();
  }
  public ngOnDestroy() {
    this.destroy$.next(true)
  }

  public fetchMore(): void {
    console.log('fetchMore', this.isMaxPage)
    if(!this.isMaxPage) {
      this._page$.next(this._page$.value + 1)
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
      this.getValueFromControl$<string | undefined>(this.searchControl),
      this.getValueFromControl$<string | undefined>(this.deviceControl),
      this.getValueFromControl$<Sort>(this.sortControl)
    ]).pipe(
      // give the user time to type in their choices
      debounceTime(1000/3),
      //skip the very first value emitted as it will be the default ones 
      skip(1),
      // make sure you always unsubscribe at some point
      //takeUntil(this.isDestroyed$())
      takeUntil(this.destroy$)
    ).subscribe(_ => {
      console.log('watchSearchFieldsForReset')
      // reset page to 1 in order to trigger a new call to the api
      this._page$.next(this.firstPageNumber);
      console.log(this._page$.value)
    })
  }

  private isDestroyed$(): Observable<boolean> {
    return this.destroy$.asObservable().pipe(filter(destroy => destroy))
  }
}
