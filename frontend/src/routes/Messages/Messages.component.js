import { retrieveUser } from "../../hooks/handleLogin";

import './Messages.style.scss';
import React, { PureComponent } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllChatsOfUser, getFullChatData } from "../../hooks/chat";
import { getUserById } from "../../hooks/user";

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
        };
    }

    componentDidMount() {
        document.title = 'Messages | IM';
        this.getUserData();
        this.fetchChats();
    }

    async getUserData() {
        const { userId } = this.state;

        const response = await getUserById(userId);

        if (!response) {
            return;
        }

        this.setState({ userData: response });
    }

    async fetchChats() {
        const { userId } = this.state;
        const response = await getAllChatsOfUser(userId);

        if (!response) {
            return;
        }

        response.forEach(async (chat) => {
            const fullChat = await getFullChatData(chat._id);
            this.setState({ chats: [...this.state.chats, fullChat] });
        });
    }

    renderChat() {
        const { selectedChat } = this.state;

        if (!selectedChat) {
            return (
            <div className="chat empty">
                <span>
                    You can select a chat from the sidebar
                </span>
            </div>
            );
        }

        return (
            <div className="chat">
                <h1>{ selectedChat }</h1>
            </div>
        );
    }

    render() {
        const { chats, userData } = this.state;
        return (
            <div className="messages">
                <Sidebar chats={chats} userData={userData} />
                { this.renderChat() }
            </div>
        );
    }
}

export default MessagesComponent;
