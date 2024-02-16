import { PureComponent } from "react";
import './Sidebar.style.scss';
import { Navigate } from "react-router-dom";

export class Sidebar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redirecting: false,
            selectedChat: null
        };

        this.redirectToChat = this.redirectToChat.bind(this);
    }

    redirectToChat(sender) {
        this.setState({ redirecting: true, selectedChat: sender });
    }

    renderChat = (chat) => {
        const { userData } = this.props;
        const { participants, messages, updatedAt } = chat;

        const person = participants.find((participant) => participant !== userData.username);

        const lastMessage = messages[messages.length - 1].content;

        return (
            <div
              className="sidebar__chat"
              onClick={() => this.redirectToChat(person) }
            >
                <img src="https://via.placeholder.com/50" alt="Avatar" />
                <div className="sidebar__chat__info">
                    <h3>{ person }</h3>
                    <p>{ lastMessage }</p>
                </div>
                <span>{ new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }</span>
            </div>
        );
    }

    renderChats() {
        const { chats } = this.props;

        if (!chats.length) {
            return (
                <div className="sidebar__chat empty">
                    <span>No chats</span>
                </div>
            );
        };

        return chats.map((chat) => this.renderChat(chat));
    }

    render() {
        const { redirecting, selectedChat } = this.state;

        return (
            <div className="sidebar">
                { redirecting && <Navigate to={`/chat/${selectedChat}`} /> }
                <h2>Chats</h2>
                <div className="sidebar__chatlist">
                    { this.renderChats() }
                </div>
            </div>
        );
    }
}

export default Sidebar;
