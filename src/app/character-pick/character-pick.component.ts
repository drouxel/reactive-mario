import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'
import { Character } from './character.model';
import { CharacterStore } from './character.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-pick',
  imports: [MatGridListModule,NgOptimizedImage, AsyncPipe],
  templateUrl: './character-pick.component.html',
  styleUrl: './character-pick.component.scss'
})
export class CharacterPickComponent {
  private _characterStore: CharacterStore = inject(CharacterStore);
  public selecterCharacter$: Observable<Character | undefined> = this._characterStore.getCharacter$();
  public characters$ = this._characterStore.getCharacters$();

  public pickCharacter(character: Character): void {
    this._characterStore.setCharacter(character);
  }
}
