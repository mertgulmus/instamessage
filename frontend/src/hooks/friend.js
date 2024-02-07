const addFriend = async (id, friendId) => {
    const response = await fetch(`/api/user/${id}/friends`, {
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
    const response = await fetch(`/api/user/${id}/friends/remove`, {
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
    const response = await fetch(`/api/user/${id}/friends/accept`, {
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
    const response = await fetch(`/api/user/${id}/friends/reject`, {
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
    const response = await fetch(`/api/user/${id}/requests`);
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


export { addFriend, removeFriend, acceptFriend, rejectFriend, getFriendRequests, getFriends };
