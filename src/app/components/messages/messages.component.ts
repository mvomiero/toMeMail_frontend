import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { MessageCardComponent } from '../message-card/message-card.component';

interface Message {
  id: number;
  content: string;
  dueDate: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageCardComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
      }
    });
  }
}
