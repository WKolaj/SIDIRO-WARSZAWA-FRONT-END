import React from "react";
import { connect } from "react-redux";
import {
  manageDialogOpen,
  manageDialogTab,
  displayTimeRange
} from "../actions/index";
import { getDeviceNameForApiCall } from "../utils/getDeviceNameForApiCall";
import { getData } from "../actions/iottimeseriesData";

class Test extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          this.props.displayTimeRange(
            "cb_2F5",
            "2F5",
            null,
            null,
            "THDItab",
            "2019-09-01T12:18:55.180Z"
          );
        }}
      >
        test
      </button>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceNameForApiCall: state.dialogReducer.deviceTitle,
    tabIndex: state.dialogReducer.tabIndex
  };
}

const mapDispatchToProps = {
  manageDialogOpen,
  manageDialogTab,
  displayTimeRange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
