import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'

@Component({
  selector: 'app-character-pick',
  imports: [MatGridListModule,NgOptimizedImage],
  templateUrl: './character-pick.component.html',
  styleUrl: './character-pick.component.scss'
})
export class CharacterPickComponent {
  public characters = MARIO_CHARACTERS
}

const MARIO_CHARACTERS = [
  {name: 'Mario', imageName: 'mario_vecteezy.jpg', class: 'mario'},
  {name: 'Peach', imageName: 'peach_vecteezy.jpg', class: 'peach'},
  {name: 'Toad', imageName: 'toad_vecteezy.jpg', class: 'toad'},
  {name: 'Luigi', imageName: 'luigi_vecteezy.jpg', class: 'luigi'},
  {name: 'Daisy', imageName: 'daisy_vecteezy.jpg', class: 'daisy'},
  {name: 'Rosalina', imageName: 'rosalina.jpg', class: 'rosalina'},
  {name: 'Yoshi', imageName: 'yoshi_vecteezy.jpg', class: 'yoshi'},
  {name: 'Dry Bones', imageName: 'dry_bones_vecteezy.jpg', class: 'dry-bones'},
  {name: 'Wario', imageName: 'wario.jpg', class: 'wario'},
  {name: 'Waluigi', imageName: 'waluigi.webp', class: 'waluigi'},
  {name: 'Donkey Kong', imageName: 'donkey_kong_vecteezy.jpg', class: 'donkey-kong'},
  {name: 'Bowser', imageName: 'bowser_vecteezy.jpg', class: 'bowser'},
]