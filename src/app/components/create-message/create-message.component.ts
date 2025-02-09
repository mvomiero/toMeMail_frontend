import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { MessageDto } from '../../models/message-dto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-message',
  standalone: true, // ✅ Standalone component
  imports: [FormsModule, CommonModule], // ✅ Required imports
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent {
  content: string = '';
  dueDate: string = '';

  constructor(private messageService: MessageService, private router: Router) {
    console.log('🚀 CreateMessageComponent Loaded!'); // ✅ Debugging log
  }

  onSubmit() {
    const newMessage: MessageDto = {
      content: this.content,
      dueDate: this.dueDate
    };

    this.messageService.createMessage(newMessage).subscribe(() => {
      this.router.navigate(['/messages']); // ✅ Redirect back to messages after success
    });

    this.resetForm();
  }

  cancel() {
    this.router.navigate(['/messages']); // ✅ Redirect without saving
  }

  resetForm() {
    this.content = '';
    this.dueDate = '';
  }
}

