export interface Message {
  id: number;
  content: string;
  dueDate: string; // ISO format
  creationDate: string; // ISO format
  senderAge: number;
  recipientAge: number;
}
