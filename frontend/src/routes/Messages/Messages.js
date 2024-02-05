import { useEffect, useState } from "react";
import { retrieveUser } from "../../hooks/handleLogin";

import './Messages.style.scss';
import React, { PureComponent } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export class Messages extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            messages: []
        };
    }

    componentDidMount() {
        const user = retrieveUser();
        if (user) {
            this.setState({ user });
        }

        if (!user) {
            window.location.href = '/login';

        document.title = 'Messages | IM';
        this.fetchMessages();
        }
    }

    async fetchMessages() {
        const response = await fetch('/api/message');
        const data = await response.json();

        if (response.ok) {
            this.setState({ messages: data });
        }
    }

    render() {
        const { messages } = this.state;

        return (
            <div className="messages">
                <Sidebar />
            </div>
        );
    }
}

export default Messages;
