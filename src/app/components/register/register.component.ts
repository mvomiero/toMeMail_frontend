import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  dateOfBirth: string = ''; // Format: YYYY-MM-DD
  role: string = 'USER'; // Default role
  message: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user: User = {
      username: this.username,
      password: this.password,
      dateOfBirth: this.dateOfBirth, // Already in "YYYY-MM-DD" format
      role: this.role
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        this.message = `${response.message}`;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect after 2 seconds
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'An error occurred';
        this.message = `Registration failed: ${errorMsg}`;
      },
    });
  }
}
