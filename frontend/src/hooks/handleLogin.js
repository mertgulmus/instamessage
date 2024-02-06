import sha256 from 'js-sha256';

export const signup = async (username, password, email) => {
    const data = {
        username,
        password: sha256(password),
        email
    };

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const user = await response.json();

    if (user.error) {
        return false;
    }

    return user;
}

export const handleLogin = async (username, password) => {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: sha256(password)})
    });

    const data = await response.json();

    if (data.error) {
        return false;
    }

    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const handleLogout = () => {
    localStorage.removeItem('user');
    console.log(localStorage);
    window.location.href = '/login';
};

export const retrieveUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
};
