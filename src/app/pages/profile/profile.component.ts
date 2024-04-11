import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { checkUsernameValidator } from '../../utility/validators/auth/username.validator';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private _formBuilder: FormBuilder, private _authService: AuthenticationService) {}

  userId = this._authService.getUserDeatils()?.userId;

  form = this._formBuilder.group({
    firstname: [''],
    lastname: [''],
    dateOfBirth: [''],
    gender: [''],
    username: ['', checkUsernameValidator()],
    email: ['', Validators.email],
  });

  updateProfile() {    
    if(this.userId) {
      this._authService.updateUserDetails(this.userId, this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          
        }, error: (error) => {
          console.log(error);
          
        }
      });
    }
  }
}
