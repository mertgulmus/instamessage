import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from '../../hooks/handleLogin';
import { getUserById } from "../../hooks/user";

import './Header.style.scss';
import Alert from "../Alert/Alert";

export class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            userData: {}
        };
    }

    async componentDidMount() {
        document.title = 'IM';
        const localData = localStorage.getItem('user')?.replace(/"/g, '');

        if (localData) {
            this.setState({
                user: localData
            });

            const userData = await getUserById(localData);
            this.setState({
                userData
            });
        }

        const route = window.location.pathname;

        if (route === '/login' && localStorage.getItem('user')) {
            window.location.href = '/';
        }

        if ((route !== '/login' && route !=='/signup') && !localStorage.getItem('user')) {
            window.location.href = '/login';
        }
    }

    renderAlert(alert) {
        const { hideAlert } = this.props;
        return <Alert key={alert.id} id={alert.id} alert={alert.message} type={alert.type} hideAlert={hideAlert} />;
    }

    renderAlerts() {
        const {
            alerts
        } = this.props;

        if (alerts.length === 0) {
            return null;
        }

        return (
            <div className="alerts">
                {alerts.map(alert => this.renderAlert(alert))}
            </div>
        );
    }

    render() {
        const {
            userData: { username }
        }  = this.state || {};

        return (
            <>
                { this.renderAlerts() }
                <header className="header">
                    <div className="header__logo">
                        <h1>IM</h1>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav__list">
                            {username && (
                            <>
                            <li className="header__nav__list__item">
                                Hello <b>{username}</b>!
                            </li>
                            <li className="header__nav__list__item">
                                <Link to="/">Messages</Link>
                            </li>
                            <li className="header__nav__list__item">
                                <Link to="/contacts">Contacts</Link>
                            </li>
                            <li className="header__nav__list__item">
                                <Link to="/settings">Settings</Link>
                            </li>
                            </>
                            )}
                            {username && (
                                <li className="header__nav__list__item">
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                            {!username && (
                                <li className="header__nav__list__item">
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>
            </>
        );
    }
}

export default HeaderComponent;
