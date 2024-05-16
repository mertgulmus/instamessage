import { connect } from "react-redux";
import { LoginComponent } from "./Login.component";
import { showAlert } from "../../store/dispatchers/alertSlice";
import { setUser } from "../../store/dispatchers/userSlice";

const mapStateToProps = (state) => {
    return {
        alerts: state.alert.alerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: (message) => dispatch(showAlert(message)),
        setUser: (user) => dispatch(setUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
