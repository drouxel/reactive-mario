import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SidenavComponent} from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, SidenavComponent, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
