import { Message } from '../providers/AppProvider/AppProvider.types';

export const saveMessageToLocalStorage = (newMessage: Message, conversationId: string) => {
  const data = window.localStorage.getItem(conversationId);
  if (data) {
    const messages = JSON.parse(data);
    const newMessages = [...messages, newMessage];
    window.localStorage.setItem(conversationId, JSON.stringify(newMessages));
  }else{
    window.localStorage.setItem(conversationId, JSON.stringify([newMessage]));
  }
};

export const getMessagesFromLocalStorage = (conversationId: string) => {
  const data = window.localStorage.getItem(conversationId);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
