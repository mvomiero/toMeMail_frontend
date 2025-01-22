import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  role: string = '';
  message: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit() {
    const user = { username: this.username, password: this.password, role: this.role };

    this.authService.register(user).subscribe({
      next: (response) => {
        // Assuming the response body is a string or has a "message" property
        this.message = `Success! Status: 201, Message: ${response}`;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect after 2 seconds
      },
      error: (err) => {
        // Extract status and error message from the error object
        const status = err.status || 'Unknown';
        const errorMsg = err.error || 'An error occurred';
        this.message = `Failed! Status: ${status}, Message: ${errorMsg}`;
      },
    });
  }
}
