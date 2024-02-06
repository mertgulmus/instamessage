const getUserById = async (id) => {
    const response = await fetch(`/api/user/${id}`);
    const user = await response.json();
    return user;
};

const deleteUser = async (id) => {
    await fetch(`/api/user/${id}`, {
        method: 'DELETE'
    });
};

const updateUser = async (id, data) => {
    await fetch(`/api/user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};

export { getUserById, deleteUser, updateUser };
