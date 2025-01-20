import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, shareReplay } from 'rxjs';
import { UserStore } from '../user-detail/user.store';
import { User } from '../user-detail/user.model';
import { logger } from '../utils/observable.utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public currentUser$!: Observable<User>;

  constructor( private _userStore: UserStore) {}

  public ngOnInit(): void {
    this.currentUser$ = this._userStore.getCurrentUser().pipe(logger('getCurrentUser'), shareReplay(1));

    // have a look here to see what happens while the currentUser is undefined
    this.currentUser$.subscribe(user => console.log('current user is', user));
  }
}
