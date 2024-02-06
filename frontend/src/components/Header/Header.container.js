import { connect } from "react-redux";
import { HeaderComponent } from "./Header.component";
import { clearAlert } from "../../store/dispatchers/alertSlice";

const mapStateToProps = (state) => {
    return {
        alerts: state.alert.alerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideAlert: (id) => dispatch(clearAlert(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
