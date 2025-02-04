import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { RouterOutlet, RouterLink } from '@angular/router';

interface Message {
  id: number;
  content: string;
  dueDate: string;
}

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.css'
})
export class MessageDetailComponent implements OnInit {
  message: Message | null = null;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const messageId = Number(this.route.snapshot.paramMap.get('id'));

    if (messageId) {
      this.messageService.getMessageById(messageId).subscribe({
        next: (data) => this.message = data,
        error: (err) => console.error('Error fetching message:', err)
      });
    }
  }
}
