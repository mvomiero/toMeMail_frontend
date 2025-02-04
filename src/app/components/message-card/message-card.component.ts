import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Message {
  id: number;
  content: string;
  dueDate: string;
}

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css'
})
export class MessageCardComponent {
  @Input() message!: Message;
}
