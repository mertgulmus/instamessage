import { PureComponent } from "react";
import './Sidebar.style.scss';
import { Navigate } from "react-router-dom";

export class Sidebar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            redirecting: false,
            selectedChat: null
        };

        this.redirectToChat = this.redirectToChat.bind(this);
    }

    componentDidMount() {
        this.fetchChats();
    }

    async fetchChats() {
        const response = await fetch('/api/chats/list/' + localStorage.getItem('user'));

        const data = await response.json();

        if (response.ok) {
            this.setState({ chats: data });
        }

        console.log(data);
    }

    redirectToChat(sender) {
        this.setState({ redirecting: true, selectedChat: sender });
    }

    renderChatList() {
        return (
            <div className="sidebar__chatlist">
                { this.renderChat() }
                { this.renderChat() }
                { this.renderChat() }
                { this.renderChat() }
                { this.renderChat() }
            </div>
        );
    }

    renderChat() {
        const chat = {
            sender: 'Ezhel',
            message: 'Lorem ipsum',
            time: '21:12'
        };

        const { sender, message, time } = chat;

        return (
            <div
              className="sidebar__chat"
              onClick={() => this.redirectToChat(sender) }
            >
                <img src="https://via.placeholder.com/50" alt="Avatar" />
                <div className="sidebar__chat__info">
                    <h3>{ sender }</h3>
                    <p>{ message }</p>
                </div>
                <span>{ time }</span>
            </div>
        );
    }
    render() {
        const { redirecting, selectedChat } = this.state;

        return (
            <div className="sidebar">
                { redirecting && <Navigate to={`/chat/${selectedChat}`} /> }
                <h2>Chats</h2>
                { this.renderChatList() }
            </div>
        );
    }
}

export default Sidebar;
