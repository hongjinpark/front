import { httpApi } from './axios';

export const getChatRoomList = () => {
  return httpApi.get('/chat/chatroom');
};
export const getChatRoom = (id) => {
  return httpApi.get(`/chat/chatroom/${id}`);
};
export const createChatRoom = (message, id) => {
  return httpApi.post(`/chat/createroom/${id}`, message, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const existChatRoom = (productId) => {
  return httpApi.get(`/chat/chatroom/product/${productId}`);
};
