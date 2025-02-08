export interface User {
  username: string;
  password: string;
  role?: string; // Optional
  dateOfBirth: string; // Format: "YYYY-MM-DD"
}