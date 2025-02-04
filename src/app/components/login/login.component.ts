import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

onSubmit() {
  const user = { username: this.username, password: this.password };

  this.authService.login(user).subscribe({
    next: (response) => {
      console.log('Login response:', response); // Debugging
      const token = response.token;  // Now properly extracting from DTO

      if (token) {
        sessionStorage.setItem('jwt', token);
        //localStorage.setItem('jwt', token);  // Store JWT token
        this.message = `Login successful! Redirecting...`;
        setTimeout(() => {
          this.router.navigate(['/messages']);  // Redirect to homepage or dashboard
        }, 1500);
      } else {
        this.message = `Unexpected response format: ${JSON.stringify(response)}`;
      }
    },
    error: (err) => {
      console.error('Login error:', err);
      const status = err.status || 'Unknown';
      const errorMsg = err.error?.message || JSON.stringify(err.error) || 'Invalid credentials';
      this.message = `Login failed! Status: ${status}, Message: ${errorMsg}`;
    }
  });
}


}
