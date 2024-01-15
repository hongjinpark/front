import { httpApi } from './axios';

export const getChatRoom = () => {
  return httpApi.get('/chat/chatroom');
};
