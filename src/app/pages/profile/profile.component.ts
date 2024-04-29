import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkUsernameValidator } from '../../utility/validators/auth/username.validator';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { ToasterService } from '../../components/toaster/services/toaster.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  firstName!: string;

  isLoading = signal(false);

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _toast: ToasterService
  ) {
    this.firstName = this._authService.getName();
    console.log(this.firstName);
    
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  form = this._formBuilder.group({
    firstname: [''],
    lastname: [''],
    dateOfBirth: [''],
    gender: [''],
    username: ['', checkUsernameValidator()],
    email: ['', Validators.email],
  });

  get username() {
    return this.form.controls['username'];
  }

  get email() {
    return this.form.controls['email'];
  }


  handleImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  updateProfile() {
    if (this.checkFormValidity()) {
      this.isLoading.set(true);

      this._authService.updateUserDetails(this.form.value).subscribe({
        next: (response) => {
          this.isLoading.set(false);

          if (response.status === 'success') {
            this.form.reset();
            this._toast.showSuccess('Update Sucessful!');
            this.fetchUserDetails();
          } else {
            this._toast.showError('Update Failed!');
          }
        },
        error: () => {
          this.isLoading.set(false);
          this._toast.showError(
            'An error occurred. Please try again later.'
          );
        },
      });
    }
  }

  checkFormValidity(): Boolean {
    if (!this.form.value) {
      this._toast.showError('All fields cannot be empty.');

      return false;
    }

    return true;
  }

  fetchUserDetails() {
    this._authService.getUserProfileDetails().subscribe({
      next: (details) => {
        this.form.setValue(details);
      },
      error: (error) => {
        this._toast.showError(error);
      },
    });
  }
}
