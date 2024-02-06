import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../hooks/handleLogin";
import "./Signup.style.scss";

export class SignupComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    onPasswordConfirmChange = (e) => {
        this.setState({ passwordConfirm: e.target.value });
    };

    async handleSubmit(e) {
        e.preventDefault();
        const { username, email, password, passwordConfirm } = this.state;
        const { showAlert } = this.props;

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        if (!usernameRegex.test(username) || !passwordRegex.test(password) || !emailRegex.test(email)) {
            showAlert({ message: "Please use proper formatting", type: "error" });
            return;
        }

        if (password !== passwordConfirm) {
            showAlert({ message: "Passwords do not match", type: "error" });
            return;
        }

        const response = await signup(username, password, email);

        if (!response) {
            showAlert({ message: "Invalid username or password", type: "error" });
            return;
        }

        showAlert({ message: "Account created", type: "success" });

        window.location.href = "/login";
    }

    render() {
        return (
            <div className="signup">
                <h1>Signup</h1>
                <form>
                    <input type="text" placeholder="Username" onChange={this.onUsernameChange} />
                    <input type="text" placeholder="Email" onChange={this.onEmailChange}/>
                    <input type="password" placeholder="Password" onChange={this.onPasswordChange}/>
                    <input type="password" placeholder="Confirm Password" onChange={this.onPasswordConfirmChange}/>
                    <button onClick={this.handleSubmit}>Signup</button>
                    <Link to="/login">Already have an account? Login</Link>
                </form>
            </div>
        );
    }
};

export default SignupComponent;
