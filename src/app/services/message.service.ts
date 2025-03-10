import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message.model';
import { MessageDto } from '../models/message-dto.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  getMessageById(id: number): Observable<Message> {
  return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }

  createMessage(messageDto: MessageDto): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, messageDto);
  }
}
