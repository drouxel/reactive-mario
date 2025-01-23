import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { UserStore } from '../user-detail/user.store';
import { User } from '../user-detail/user.model';
import { logger } from '../utils/observable.utils';
import { Character } from '../character-pick/character.model';
import { CharacterStore } from '../character-pick/character.store';
import { GameDetail } from '../games/game-search-result.model';
import { GameStore } from '../games/game.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private _userStore: UserStore = inject(UserStore);
  public currentUser$: Observable<User | undefined> = this._userStore.getUser$().pipe(logger('getCurrentUser'), shareReplay(1));;
  public currentCharacter$: Observable<Character | undefined> = inject(CharacterStore).getCharacter$();
  public currentGame$: Observable<GameDetail | undefined> = inject(GameStore).getCurrentGame$();
  public currentUser: User | undefined = undefined;
  public descriptionCombined$: Observable<string> = combineLatest([
    this.currentCharacter$,
    this.currentGame$,
    this.currentUser$
  ]).pipe(
    map(([character, game, user]) => {
      return this.getDescription(user, character, game)
    })
  )


  public ngOnInit(): void {
    // have a look here to see what happens while the currentUser is undefined
    this.currentUser$.subscribe(user => console.log('current user is', user));
  }

  private getDescription(user?: User, character?: Character, game?: GameDetail): string {
    if(!user) return 'Nobody is playing at the moment';
    return `${user?.surname ?? ''} ${user?.name ?? ''} is playing ${game?.name ?? ''} with ${character?.name ?? ''}`
  }
}
