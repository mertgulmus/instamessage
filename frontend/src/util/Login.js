import sha256 from 'crypto-js/sha256';

export const login = (username, password) => {
    const data = {
        username,
        password
    };

    return fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw Error(data.error);
            }

            return data;
        });
}

export const signup = (username, password, email, firstName, lastName) => {
    const data = {
        username,
        password: sha256(password),
        email,
        firstName,
        lastName
    };

    return fetch(`/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw Error(data.error);
            }

            return data;
        });
}
