import {Component, inject} from '@angular/core';
import {GamesService} from './games.service';
import {AsyncPipe, JsonPipe, NgOptimizedImage} from '@angular/common';
import {Device, GameSearchItem, PaginatedSearchResult, PaginationResult} from './game-search-result.model';
import {combineLatest, debounceTime, map, Observable, shareReplay, startWith, switchMap} from 'rxjs';
import {GameDetailComponent} from '../game-detail/game-detail.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-games',
  imports: [
    JsonPipe,
    AsyncPipe,
    GameDetailComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgOptimizedImage,
    MatTooltip,
    MatProgressSpinner
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  providers: [GamesService]
})
export class GamesComponent {
  private _gamesService: GamesService = inject(GamesService);
  public devices$: Observable<Device[]> = this._gamesService.getDevices$()
  public searchControl: FormControl = new FormControl<string>('',);
  public deviceControl: FormControl = new FormControl<string>('',);

  public result$: Observable<PaginatedSearchResult<GameSearchItem>> = combineLatest([
    this.getValueFromControl$<string>(this.searchControl),
    this.getValueFromControl$<string>(this.deviceControl)
  ]).pipe(
    debounceTime(1000/3),
    switchMap(([search, device]) =>
      this._gamesService.getPaginated$(search, device)),
    shareReplay()
  );
  public pagination$: Observable<PaginationResult> = this.result$.pipe(map((result: PaginatedSearchResult<GameSearchItem>) => result.pagination));
  public games$: Observable<GameSearchItem[]> = this.result$.pipe(map(result => result.data));

  private getValueFromControl$<T>(control: FormControl): Observable<T> {
    return control.valueChanges.pipe(
      startWith(control.value)
    )
  }
}
