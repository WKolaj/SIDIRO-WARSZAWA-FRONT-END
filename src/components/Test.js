import React from 'react';
import { connect } from 'react-redux';
import { manageDialogOpen, manageDialogTab } from '../actions/index';
import { getDeviceNameForApiCall } from "../utils/getDeviceNameForApiCall";
import { getData } from "../actions/iottimeseriesData";

class Test extends React.Component {

    render() {
        return(
            <button onClick={()=>{
                this.props.manageDialogOpen(true,'cb_2F5','2F5',null,null)
                this.props.manageDialogTab('THDItab')
            }
        }>test</button>
        )
    }
}


function mapStateToProps(state) {
    return {
        deviceNameForApiCall: state.dialogReducer.deviceTitle,
        tabIndex: state.dialogReducer.tabIndex,
    };
}

const mapDispatchToProps = {
    manageDialogOpen,
    manageDialogTab
};

export default connect(mapStateToProps,mapDispatchToProps)(Test)