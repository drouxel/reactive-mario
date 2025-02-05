import { Injectable } from '@angular/core'
import { User } from "./user.model";
import { BehaviorSubject, Observable } from 'rxjs';
import { filterNullAndUndefined, logger } from '../utils/observable.utils';

/**
 * mediator class to share a User entity through the app
 */
@Injectable({
    providedIn: 'root'
})
export class UserStore {
    private _user$: BehaviorSubject<User | undefined> 
        = new BehaviorSubject<User | undefined>(undefined);

    public getCurrentUser$(): Observable<User> {
        return this.getUser$().pipe(
            filterNullAndUndefined(),
            logger('UserStore | getCurrentUser$')
        );
    }

    public getUser$(): Observable<User | undefined> {
        return this._user$.asObservable().pipe(logger('UserStore | getUser$'));
    }

    public setUser(user?: User): void {
        console.log('UserStore | setUser')
        this._user$.next(user);
    }

    public getUser(): User | undefined {
        return this._user$.value;
    }
}

