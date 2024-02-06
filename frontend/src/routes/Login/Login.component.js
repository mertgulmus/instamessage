import React, { PureComponent } from 'react';
import { handleLogin } from '../../hooks/handleLogin';
import './Login.style.scss';
import { Link } from 'react-router-dom';

export class LoginComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            alert: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    async handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const { showAlert } = this.props;

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
            showAlert({ message: 'Please use proper formatting', type: 'error' });
            return;
        }

        const response = await handleLogin(username, password);

        if (!response) {
            showAlert({ message: 'Invalid username or password', type: 'error' });
            return;
        }

        showAlert({ message: 'Logged in', type: 'success' });

        window.location.href = '/';
    }

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" onChange={this.onUsernameChange} />
                    <input type="password" placeholder="Password" onChange={this.onPasswordChange} />
                    <button onClick={ this.handleSubmit }>Login</button>
                    <Link to="/signup">Don't have an account? Sign up</Link>
                </form>
            </div>
        );
    }
}

export default LoginComponent;
