import { PureComponent } from "react";
import { getFriends, getFriendRequests, acceptFriend, rejectFriend, addFriend, removeFriend } from "../../hooks/friend";
import { getUserFromUsername } from "../../hooks/user";
import './Contacts.style.scss';
import { retrieveUser } from "../../hooks/handleLogin";

export class ContactsComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: retrieveUser(),
            friends: [],
            requests: [],
            activeTab: "friends",
            friendInput: ""
        };

        this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
        this.handleRejectRequest = this.handleRejectRequest.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    async componentDidMount() {
        const { user } = this.state;
        const friends = await getFriends(user);
        const requests = await getFriendRequests(user);

        this.setState({ friends, requests });
    };

    handleAcceptRequest = async (e, request) => {
        e.preventDefault();
        const { user } = this.state;
        const updatedUser = await acceptFriend(user, request._id);

        this.setState({ requests: updatedUser.friendRequests });
    }

    handleRejectRequest = async (e, request) => {
        e.preventDefault();
        const { user } = this.state;
        const updatedUser = await rejectFriend(user, request._id);

        this.setState({ requests: updatedUser.friendRequests });
    }

    handleAddFriend = async (e) => {
        const { showAlert } = this.props;
        e.preventDefault();
        const { user, friendInput } = this.state;
        const findFriend = await getUserFromUsername(friendInput);

        if (findFriend.error) {
            showAlert({ message: findFriend.error, type: 'error' });
            return;
        }

        const response = await addFriend(user, findFriend._id);

        if (response.error) {
            showAlert({ message: response.error, type: 'error' });
            return;
        }

        showAlert({ message: 'Friend request sent', type: 'success' });
    }

    handleRemoveFriend = async (e, friend) => {
        e.preventDefault();
        const { user } = this.state;
        const updatedUser = await removeFriend(user, friend._id);

        this.setState({ friends: updatedUser.friends });
    }

    handleInputChange = (e) => {
        this.setState({ friendInput: e.target.value });
    }

    renderIncomingRequest = (request) => {
        return (
            <div className="contacts__list__item" key={ request._id }>
                <img src="https://via.placeholder.com/50" alt="Avatar" />
                <h3>{ request.username }</h3>
                <div className="contacts__list__item__actions">
                    <button onClick={(e) => this.handleAcceptRequest(e, request)}>Accept</button>
                    <button onClick={(e) => this.handleRejectRequest(e, request)}>Reject</button>
                </div>
            </div>
        );
    }

    renderIncomingRequests() {
        const { activeTab, requests } = this.state;

        if (activeTab !== "requests") {
            return null;
        }

        if (!requests.length) {
            return (
                <div className="contacts__list__item">
                    <span>No requests</span>
                </div>
            );
        }

        return requests.map((request) => this.renderIncomingRequest(request));
    }

    renderSentRequest = (request) => {
        return (
            <div className="contacts__list__item" key={ request._id }>
                <img src="https://via.placeholder.com/50" alt="Avatar" />
                <h3>{ request.username }</h3>
                <div className="contacts__list__item__actions">
                    <span>Sent</span>
                </div>
            </div>
        );
    }

    renderSentRequests() {
        const { activeTab, requests } = this.state;

        if (activeTab !== "requests") {
            return null;
        }

        if (!requests.length) {
            return (
                <div className="contacts__list__item">
                    <span>No requests</span>
                </div>
            );
        }

        return requests.map((request) => this.renderRequest(request));
    }

    renderRequests() {
        const { activeTab } = this.state;

        if (activeTab !== "requests") {
            return null;
        }

        return (
            <div className="contacts__requests">
                <h2>Friend requests</h2>
                { this.renderIncomingRequests() }
                <h2>Sent requests</h2>
                { this.renderSentRequests() }
            </div>
        )
    }

    renderContact = (contact) => {
        return (
            <div className="contacts__list__item" key={ contact._id }>
                <img src="https://via.placeholder.com/50" alt="Avatar" />
                <h3>{ contact.username }</h3>
                <div className="contacts__list__item__actions">
                    <button>Message</button>
                    <button onClick={(e) => this.handleRemoveFriend(e, contact)}>Remove</button>
                </div>
            </div>
        );
    }

    renderContacts() {
        const { activeTab, friends } = this.state;

        if (activeTab !== "friends") {
            return null;
        }

        if (!friends.length) {
            return (
                <div className="contacts__list__item">
                    <span>No friends</span>
                </div>
            );
        }

        return friends.map((friend) => this.renderContact(friend));
    }

    renderAddFriends() {
        const { activeTab } = this.state;

        if (activeTab !== "add") {
            return null;
        }

        return (
            <div className="contacts__add">
                <h2>Add a friend</h2>
                <input type="text" placeholder="Username" onChange={this.handleInputChange}/>
                <button onClick={(e) => this.handleAddFriend(e)}>Add</button>
            </div>
        );
    }

    render() {
        return (
            <div className="contacts">
                <h1>Contacts</h1>
                <div className="contacts__nav">
                    <button onClick={ () => this.setState({activeTab: 'friends'})}>Friends</button>
                    <button onClick={ () => this.setState({activeTab: 'requests'})}>Requests</button>
                    <button onClick={ () => this.setState({activeTab: 'add'})}>Add friends</button>
                </div>
                { this.renderContacts() }
                { this.renderRequests() }
                { this.renderAddFriends() }
            </div>
        );
    }
}

export default ContactsComponent;
