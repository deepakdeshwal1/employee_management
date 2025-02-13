import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true }, // Links to the chat room
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who sent the message
  messageType: { type: String, enum: ['text', 'image', 'video', 'audio', 'document'], required: true }, // Type of message
  content: { type: String, default: '' }, // Text message content
  attachments: [
    {
      url: { type: String, required: true }, // File URL
      fileType: { type: String, required: true }, // File type (jpg, mp4, pdf, etc.)
      fileSize: { type: Number }, // File size in KB/MB
    },
  ],
  isDeleted: { type: Boolean, default: false }, // Soft delete
  isEdited: { type: Boolean, default: false }, // Edited message
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who have read the message
  timestamp: { type: Date, default: Date.now }, // When message was sent
});



const Message = mongoose.model('Message', messageSchema);


export { Message, Chat };