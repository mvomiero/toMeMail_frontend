import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Message {
  id: number;
  content: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }
}
