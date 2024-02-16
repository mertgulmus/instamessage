const addFriend = async (id, friendId) => {
    const response = await fetch(`/api/user/${id}/request/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId })
    });

    const user = await response.json();
    return user;
}

const removeFriend = async (id, friendId) => {
    const response = await fetch(`/api/user/${id}/friend/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId })
    });
    const user = await response.json();
    return user;
}

const acceptFriend = async (id, friendId) => {
    const response = await fetch(`/api/user/${id}/request/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId })
    });
    const user = await response.json();
    return user;
};

const rejectFriend = async (id, friendId) => {
    const response = await fetch(`/api/user/${id}/request/reject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId })
    });
    const user = await response.json();
    return user;
}

const getFriendRequests = async (id) => {
    const response = await fetch(`/api/user/${id}/requests/incoming`);
    const requests = await response.json();
    return requests;
}

const getSentRequests = async (id) => {
    const response = await fetch(`/api/user/${id}/requests/sent`);
    const requests = await response.json();
    return requests;
}

const getFriends = async (id) => {
    const response = await fetch(`/api/user/${id}/friends`);
    const friends = await response.json();
    return friends;
}

const cancelSentRequest = async (id, friendId) => {
    const response = await fetch(`/api/user/${id}/request/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId })
    });
    const user = await response.json();
    return user;
}


export { addFriend, removeFriend, acceptFriend, rejectFriend, getFriendRequests, getFriends, getSentRequests, cancelSentRequest };
