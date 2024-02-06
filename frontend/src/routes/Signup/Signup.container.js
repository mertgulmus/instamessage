import { connect } from "react-redux";
import { SignupComponent } from "./Signup.component"; // Updated import
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent); // Updated export
