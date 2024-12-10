import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SidenavComponent} from './sidenav/sidenav.component';
import {GamesComponent} from './games/games.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, SidenavComponent, GamesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
