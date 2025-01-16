import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
