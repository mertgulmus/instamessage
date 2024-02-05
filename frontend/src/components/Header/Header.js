import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from '../../hooks/handleLogin';

import './Header.style.scss';

export class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: ''
        };
    }

    componentDidMount() {
        document.title = 'IM';

        if (localStorage.getItem('user')) {
            this.setState({ user: localStorage.getItem('user') });
        }
    }

    render() {
        const { user } = this.state;

        return (
            <header className="header">
                <div className="header__logo">
                    <h1>IM</h1>
                </div>
                <nav className="header__nav">
                    <ul className="header__nav__list">
                        {user && (
                        <>
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
                        {user && (
                            <li className="header__nav__list__item">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                        {!user && (
                            <li className="header__nav__list__item">
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
