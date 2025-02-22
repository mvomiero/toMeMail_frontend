import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginAsDemoUser() {
    const demoUser = { username: 'testUser', password: 'testPassword' };

    this.authService.login(demoUser).subscribe({
      next: (response) => {
        console.log('Demo Login response:', response); // Debugging
        const token = response.token;  // Extract token from response DTO

        if (token) {
          sessionStorage.setItem('jwt', token); // Store token in sessionStorage
          this.message = `Demo login successful! Redirecting...`;
          setTimeout(() => {
            this.router.navigate(['/messages']);  // Redirect to messages
          }, 1500);
        } else {
          this.message = `Unexpected response format: ${JSON.stringify(response)}`;
        }
      },
      error: (err) => {
        console.error('Demo login error:', err);
        const status = err.status || 'Unknown';
        const errorMsg = err.error?.message || JSON.stringify(err.error) || 'Invalid credentials';
        this.message = `Demo login failed! Status: ${status}, Message: ${errorMsg}`;
      }
    });
  }
}
