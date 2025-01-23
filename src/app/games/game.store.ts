import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs';
import { filterNullAndUndefined } from '../utils/observable.utils';
import { GameDetail } from './game-search-result.model';

/**
 * mediator class to share a User entity through the app
 */
@Injectable({
    providedIn: 'root'
})
export class GameStore {
    private _game$: BehaviorSubject<GameDetail | undefined> = new BehaviorSubject<GameDetail | undefined>(undefined);

    public getCurrentGame$(): Observable<GameDetail> {
        return this.getGame$().pipe(
            filterNullAndUndefined()
        );
    }

    public getGame$(): Observable<GameDetail | undefined> {
        return this._game$.asObservable();
    }

    public setGame(game?: GameDetail): void {
        this._game$.next(game);
    }

    public getGame(): GameDetail | undefined {
        return this._game$.value;
    }
}