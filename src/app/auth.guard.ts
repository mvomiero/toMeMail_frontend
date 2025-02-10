import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('jwt');

    if (!token) {
      alert('You need to log in to access this page.');
      this.router.navigate(['/login']); // Redirect to login
      return false; // Block access
    }

    return true; // Allow access if token exists
  }
}
