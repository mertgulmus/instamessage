import { retrieveUser } from "../../hooks/handleLogin";
import './Messages.style.scss';
import React, { PureComponent } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllChatsOfUser, getFullChatData, sendMessage } from "../../hooks/chat";
import { getUserById, getUserFromUsername } from "../../hooks/user";

export class MessagesComponent extends PureComponent {
    constructor(props) {
        super(props);
        const user = retrieveUser();

        if (!user) {
            window.location.href = '/login';
        }

        this.state = {
            userId: user,
            userData: {},
            chats: [],
            selectedChat: '',
            receiverUser: null,
        };

        this.selectChat = this.selectChat.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.chatMessagesRef = React.createRef();
    }

    componentDidMount() {
        document.title = 'Messages | IM';
        this.getUserData();
        this.fetchChats().then(() => {
            if (window.location.pathname.includes('chat')) {
                const chatId = window.location.pathname.split('/')[2];
                this.selectChat(chatId);
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.chats !== prevState.chats) {
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        if (this.chatMessagesRef.current) {
            this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight;
        }
    }

    async selectChat(chatId) {
        const receiverUser = await getUserFromUsername(chatId);
        if (receiverUser) {
            this.setState({ selectedChat: chatId, receiverUser }, this.fetchChats);
        }
    }

    async sendMessage(e) {
        e.preventDefault();
        const content = e.target.previousElementSibling.value;
        const { userId, receiverUser } = this.state;
        if (!content.trim()) return;

        await sendMessage(userId, receiverUser._id, content);
        e.target.previousElementSibling.value = '';
        this.fetchChats();
    }

    async getUserData() {
        const { userId } = this.state;
        const response = await getUserById(userId);

        if (response) {
            this.setState({ userData: response });
        }
    }

    async fetchChats() {
        const { userId } = this.state;
        const response = await getAllChatsOfUser(userId);

        if (response) {
            const chats = await Promise.all(response.map(async (chat) => {
                return await getFullChatData(chat._id);
            }));
            this.setState({ chats });
        }
    }

    renderChat() {
        const { selectedChat, chats, receiverUser } = this.state;

        if (!selectedChat) {
            return (
                <div className="chat empty">
                    <span>You can select a chat from the sidebar</span>
                </div>
            );
        }

        const selectedChatData = chats.find((chat) => chat.participants.includes(receiverUser?.username));

        const participants = {
            [receiverUser?._id]: receiverUser?.username,
            [this.state.userId]: this.state.userData?.username
        };

        return (
            <div className="chat__wrapper">
                <h1>{selectedChat}</h1>
                <div className="chat__messages" ref={this.chatMessagesRef}>
                    {selectedChatData?.messages.map((message, index) => (
                        <div key={index} className="chat__message">
                            <span>{participants[message.sender]}:</span>
                            <p>&nbsp;{message.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderInput() {
        return (
            <div className="chat__input">
                <input type="text" />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }

    render() {
        const { chats, userData } = this.state;
        return (
            <div className="messages">
                <Sidebar chats={chats} userData={userData} selectChat={this.selectChat} />
                <div className="chat">
                    {this.renderChat()}
                    {this.renderInput()}
                </div>
            </div>
        );
    }
}

export default MessagesComponent;
