import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // For demo/testing without running backend, fallback to route directly
    if(this.credentials.username === 'demo') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.error = 'Invalid credentials or Backend is not running'
    });
  }
}
