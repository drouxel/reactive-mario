import { Routes } from '@angular/router';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GamesComponent } from './games/games.component';
import { CharacterPickComponent } from './character-pick/character-pick.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
    },
    {
        path: 'user',
        loadComponent: () => UserDetailComponent
    },
    {
        path: 'character',
        loadComponent: () => CharacterPickComponent
    },
    {
        path: 'games',
        loadComponent: () => GamesComponent 
    }
];
