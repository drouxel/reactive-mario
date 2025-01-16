import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UserStore } from './user.store';

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
export class UserDetailComponent {
  public userForm: FormGroup;

  /**
   *
   */
  constructor(
    private _formBuilder: FormBuilder, 
    private _userStore: UserStore
  ) {

    this.userForm = this._formBuilder.group({
      name: [null, Validators.required],
      surname:  [null, Validators.required],
      birthdate: []
    })
  }

  public updateUser(): void {
    if (this.userForm.valid) {
      this._userStore.setUser(this.userForm.value)
    }
  }

  public clearUser(): void {
    this._userStore.setUser();
  }
}
