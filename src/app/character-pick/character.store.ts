import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { Character, MARIO_CHARACTERS } from './character.model';
import { filterNullAndUndefined } from '../utils/observable.utils';

/**
 * mediator class to share a Character entity through the app
 */
@Injectable({
    providedIn: 'root'
})
export class CharacterStore {
    private _character$: BehaviorSubject<Character | undefined> = new BehaviorSubject<Character | undefined>(undefined);
    private _characters$ = of(MARIO_CHARACTERS)

    public getCurrentCharacter$(): Observable<Character> {
        return this.getCharacter$().pipe(
            filterNullAndUndefined()
        );
    }

    public getCharacter$(): Observable<Character | undefined> {
        return this._character$.asObservable();
    }

    public setCharacter(character?: Character): void {
        this._character$.next(character);
    }

    public getCharacters$(): Observable<Character[]> {
        return this._characters$;
    }
}