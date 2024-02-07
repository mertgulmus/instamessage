import { PureComponent } from 'react';
import './Alert.style.scss';

export class Alert extends PureComponent {
    componentDidMount() {
        const { id, hideAlert } = this.props;

        setTimeout(() => {
            hideAlert(id);
        }, 3000);
    }

    render() {
        const {
            alert,
            type
        } = this.props;
        return (
            <div className={`alert ${type}`}>
                <p>{ alert }</p>
            </div>
        );
    }
}

export default Alert;
