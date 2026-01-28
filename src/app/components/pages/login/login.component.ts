
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="flex items-center justify-center min-h-[60vh] p-4">
      <mat-card class="w-full max-w-md">
        <mat-card-header>
          <mat-card-title class="text-center text-3xl font-bold tracking-tight">Log in to your account</mat-card-title>
        </mat-card-header>
        <mat-card-content class="mt-6">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Email address</mat-label>
              <input matInput formControlName="email" type="email" placeholder="pat@example.com">
              @if (loginForm.get('email')?.hasError('required')) {
                <mat-error>Email is required.</mat-error>
              }
               @if (loginForm.get('email')?.hasError('email')) {
                <mat-error>Please enter a valid email address.</mat-error>
              }
            </mat-form-field>

            <mat-form-field class="w-full mt-4" appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" [type]="hidePassword() ? 'password' : 'text'">
               <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
                <i class="material-icons">{{hidePassword() ? 'visibility_off' : 'visibility'}}</i>
              </button>
              @if (loginForm.get('password')?.hasError('required')) {
                <mat-error>Password is required.</mat-error>
              }
            </mat-form-field>

            @if (errorMessage()) {
              <p class="text-red-500 text-sm mt-4 text-center">{{ errorMessage() }}</p>
            }

            <button mat-flat-button color="primary" class="w-full mt-6" [disabled]="loginForm.invalid || isLoading()">
              @if(isLoading()){
                <mat-spinner [diameter]="24" class="inline-block"></mat-spinner>
              } @else {
                <span>Log in</span>
              }
            </button>
          </form>

          <p class="mt-6 text-center text-sm">
            Not a member? <a routerLink="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up now</a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  hidePassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email!, password!);
      } catch (err: any) {
        this.errorMessage.set(err.message);
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
