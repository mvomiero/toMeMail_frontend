import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.css'
})
export class MessageDetailComponent implements OnInit {
  message: Message | null = null;
  errorMessage: string | null = null;
  dueDate: string | null = null;  // ✅ Store due date from backend

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const messageId = Number(this.route.snapshot.paramMap.get('id'));

    if (messageId) {
      this.messageService.getMessageById(messageId).subscribe({
        next: (data) => {
          this.message = data;
          this.errorMessage = null;
          this.dueDate = null;
        },
        error: (err) => {
          if (err.status === 403 && err.error?.dueDate) {
            this.errorMessage = "This message is locked until its due date:";
            this.dueDate = err.error.dueDate; 
          } else {
            this.errorMessage = "An error occurred while retrieving the message.";
            this.dueDate = null;
          }
          this.message = null;
        }
      });
    }
  }

  getYear(dateString: string | null): string {
    if (!dateString) return "N/A"; 
    return new Date(dateString).getFullYear().toString();
  }
}