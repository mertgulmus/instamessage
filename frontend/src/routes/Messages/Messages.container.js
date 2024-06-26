import { connect } from "react-redux";
import { MessagesComponent } from "./Messages.component";
import { showAlert } from "../../store/dispatchers/alertSlice";

const mapStateToProps = (state) => {
    return {
        alerts: state.alert.alerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: (message) => dispatch(showAlert(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);
