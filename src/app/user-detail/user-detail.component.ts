import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UserStore } from './user.store';
import { Router } from '@angular/router';
import { autoComplete } from '../utils/observable.utils';

@Component({
  selector: 'app-user-detail',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _userStore: UserStore = inject(UserStore);
  private _router: Router = inject(Router);

  public userForm: FormGroup = this._formBuilder.group({
    name: ['Rouxel', Validators.required],
    surname:  ['Damien', Validators.required],
    birthdate: ['08/08/1987']
  })

  public ngOnInit(): void {
      this._userStore.getUser$().pipe(
        autoComplete()
      ).subscribe(user => {
        this.userForm.reset(user)
      })
  }
  public updateUser(): void {
    if (this.userForm.valid) {
      this._userStore.setUser(this.userForm.value);
      this._router.navigate(['character'])
    }
  }

  public clearUser(): void {
    this._userStore.setUser();
  }
}
