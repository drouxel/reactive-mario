import { Routes } from '@angular/router';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GamesComponent } from './games/games.component';

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
        path: 'games',
        loadComponent: () => GamesComponent 
    }
];
