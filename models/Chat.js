import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const chatSchema = new Schema({
  isGroupChat: { type: Boolean, default: false }, // Whether it's a group chat
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users in the chat
  groupName: { type: String, default: null }, // Only for group chats
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, // Last sent message
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

export { Chat };