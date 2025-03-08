import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  message: string = '';
  loading: boolean = false; // ✅ New loading state

  constructor(private authService: AuthService, private router: Router) {}

  loginAsDemoUser() {
    const demoUser = { username: 'testUser', password: 'testPassword' };

    let messageTimeout = setTimeout(() => {
      this.message = 'Waking up the backend... Please wait ⏳'; // ✅ Show message only after 1.5s
      this.loading = true;
    }, 1000); // ✅ Wait 1.5s before showing message

    this.authService.login(demoUser).subscribe({
      next: (response) => {
        clearTimeout(messageTimeout); // ✅ Stop the message if login is fast
        console.log('Demo Login response:', response);
        const token = response.token;

        if (token) {
          sessionStorage.setItem('jwt', token);
          this.message = `Login successful! Redirecting...`;
          setTimeout(() => {
            this.router.navigate(['/messages']);
          }, 500);
        } else {
          this.message = `Unexpected response format: ${JSON.stringify(response)}`;
        }
        this.loading = false;
      },
      error: (err) => {
        clearTimeout(messageTimeout); // ✅ Stop the message if login fails quickly
        console.error('Demo login error:', err);
        const status = err.status || 'Unknown';
        const errorMsg = err.error?.message || JSON.stringify(err.error) || 'Invalid credentials';
        this.message = `Demo login failed! Status: ${status}, Message: ${errorMsg}`;
        this.loading = false;
      }
    });
}
}
