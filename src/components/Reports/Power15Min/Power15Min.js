import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
// import GroupConsumptionComponent from "./GroupConsumptionComponent";
// import DailyConsumptionComponent from "./DailyConsumptionComponent";
// import PowerFactorDailyConsumptionComponent from "./PowerFactorDailyConsumptionComponent";
// import ReactiveEnergyImportDailyConsumptionComponent from "./ReactiveEnergyImportDailyConsumptionComponent";
// import ReactiveEnergyExportDailyConsumptionComponent from "./ReactiveEnergyExportDailyConsumptionComponent";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { DatePicker } from "@material-ui/pickers";
import { fetch15MinPowerReportActionCreator } from "../../../actions/power15MinReportData";
import { exists, existsAndIsNotEmpty } from "../../../utils/utilities";

const styles = theme => ({
  appBar: {
    padding: theme.spacing(2),
    position: "static"
  }
});

class Power15MinComponent extends Component {
  componentDidMount = async () => {
    let now = new Date(Date.now());
    this.props.fetchPower15MinReport(now.getFullYear(), now.getMonth());
  };

  handleDateChange = date => {
    let { fetchEnergyReport, energyReport } = this.props;

    if (exists(date)) fetchEnergyReport(date.getFullYear(), date.getMonth());
  };

  renderNavBar = () => {
    let { t, classes, selectedDate } = this.props;

    let now = new Date(Date.now());

    return (
      <AppBar className={classes.appBar} color="default">
        <DatePicker
          views={["year", "month"]}
          label={t("reportsEnergyReportDateTimePickerTitle")}
          minDate={new Date("2019-01-01")}
          maxDate={new Date(now.getFullYear(), now.getMonth() + 1)}
          value={selectedDate}
          onChange={date => this.handleDateChange(date)}
          animateYearScrolling
        />
      </AppBar>
    );
  };

  renderReport = () => {
    let { t, classes, power15MinReport } = this.props;

    if (!existsAndIsNotEmpty(power15MinReport.data)) return null;

    return null;
  };

  render() {
    let { t, classes, power15MinReport } = this.props;

    console.log(power15MinReport);

    return (
      <React.Fragment>
        <Grid item>{this.renderNavBar()}</Grid>
        {this.renderReport()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  let selectedDate = null;

  if (
    exists(state.power15MinReport.year) &&
    exists(state.power15MinReport.month)
  )
    selectedDate = new Date(
      state.power15MinReport.year,
      state.power15MinReport.month
    );
  return {
    power15MinReport: state.power15MinReport,
    selectedDate: selectedDate
  };
}

const mapDispatchToProps = {
  fetchPower15MinReport: fetch15MinPowerReportActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(Power15MinComponent))));
