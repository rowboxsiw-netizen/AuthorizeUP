
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="container mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Profile</h2>
       <mat-card class="mt-8">
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Display Name</mat-label>
              <input matInput formControlName="displayName">
            </mat-form-field>

             <mat-form-field class="w-full mt-4" appearance="outline">
              <mat-label>Email Address</mat-label>
              <input matInput formControlName="email" type="email" readonly>
               <mat-hint>Email address cannot be changed.</mat-hint>
            </mat-form-field>

            <button mat-flat-button color="primary" class="mt-6" [disabled]="profileForm.invalid">
              Update Profile
            </button>
          </form>
        </mat-card-content>
       </mat-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  profileForm = this.fb.group({
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    displayName: ['', Validators.required],
  });

  constructor() {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.profileForm.patchValue({
        email: currentUser.email,
        displayName: currentUser.displayName,
      });
    }
  }
  
  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Updating profile...', this.profileForm.value);
      // In a real app, you would call a service to update the user data
    }
  }
}
