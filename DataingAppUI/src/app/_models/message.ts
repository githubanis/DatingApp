export interface Message {
  id: number;
  senderId: number;
  SenderKnownAs: string;
  SenderPhotoUrl: string;
  recipientId: number;
  recipientKnownAs: string;
  recipientPhotoUrl: string;
  content: string;
  isRead: boolean;
  dateRead: Date;
  MessageSent: Date;
}
