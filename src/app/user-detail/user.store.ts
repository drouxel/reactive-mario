import { Injectable } from '@angular/core'
import { User } from "./user.model";
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { filterNullAndUndefined } from '../utils/observable.utils';

/**
 * mediator class to share a User entity through the app
 */
@Injectable({
    providedIn: 'root'
})
export class UserStore {
    private _user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    public getCurrentUser(): Observable<User> {
        return this.getUser().pipe(
            filterNullAndUndefined()
        );
    }

    public getUser(): Observable<User | undefined> {
        return this._user$.asObservable();
    }

    public setUser(user?: User): void {
        this._user$.next(user);
    }
}