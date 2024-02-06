import { getUserById } from "./user";

const getAllChatsOfUser = async (userId) => {
    const response = await fetch(`/api/chat/list/${userId}`);
    const chats = await response.json();
    return chats;
};

const getChatById = async (id) => {
    const response = await fetch(`/api/chat/${id}`);
    const chat = await response.json();
    return chat;
};

const createChat = async (participants, messages) => {
    await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ participants, messages })
    });
};

const deleteChat = async (id) => {
    await fetch(`/api/chat/${id}`, {
        method: 'DELETE'
    });
};

const getFullChatData = async (id) => {
    const response = await fetch(`/api/chat/info/${id}`);
    const chat = await response.json();
    return chat;
};

export {
    getAllChatsOfUser,
    getChatById,
    createChat,
    deleteChat,
    getFullChatData
};
