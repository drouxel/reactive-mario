import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { CharacterStore } from '../character-pick/character.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatListModule, RouterModule, AsyncPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  public currentCharacter$ = inject(CharacterStore).getCharacter$();
}
