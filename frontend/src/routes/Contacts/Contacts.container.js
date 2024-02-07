import { connect } from "react-redux";
import { ContactsComponent } from "./Contacts.component";
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsComponent);
