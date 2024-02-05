import React, { PureComponent } from 'react';
import { handleLogin } from '../../hooks/handleLogin';
import './Login.style.scss';
import { Link } from 'react-router-dom';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            alert: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            window.location.href = '/';
        }
    };

    componentDidUpdate() {
        if (localStorage.getItem('user')) {
            window.location.href = '/';
        }
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

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
            this.setState({ alert: 'Please use proper formatting' });
            return;
        }

        const response = await handleLogin(username, password);

        if (!response) {
            this.setState({ alert: 'Invalid username or password' });
            return;
        }

        window.location.href = '/';
    }

    render() {
        const { alert } = this.state;
        return (
            <div className="login">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" onChange={this.onUsernameChange} />
                    <input type="password" placeholder="Password" onChange={this.onPasswordChange} />
                    <button onClick={ this.handleSubmit }>Login</button>
                    <p>{ alert }</p>
                    <Link to="/signup">Don't have an account? Sign up</Link>
                </form>
            </div>
        );
    }
}

export default Login;
