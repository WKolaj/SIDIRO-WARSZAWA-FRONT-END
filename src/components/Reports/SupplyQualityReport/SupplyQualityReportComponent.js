import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { DatePicker } from "@material-ui/pickers";
import { fetchSupplyQualityReportActionCreator } from "../../../actions/supplyQualityReportData";
import { exists, existsAndIsNotEmpty } from "../../../utils/utilities";

import SupplyQualityReportTransformerComponent from "./SupplyQualityReportTransformerComponent";
import SupplyQualityReportTHDComponent from "./SupplyQualityReportTHDComponent";
import SupplyQualityReportInfeedsTHDComponent from "./SupplyQualityReportInfeedsTHDComponent";

const styles = theme => ({
  appBar: {
    padding: theme.spacing(2),
    position: "static"
  },
  navBarGridItem: {
    width: "100%"
  }
});

class Power15MinComponent extends Component {
  componentDidMount = async () => {
    let { fetchSupplyQualityReport } = this.props;
    let now = new Date(Date.now());
    await fetchSupplyQualityReport(now.getFullYear(), now.getMonth());
  };

  handleDateChange = date => {
    let { fetchSupplyQualityReport } = this.props;

    if (exists(date))
      fetchSupplyQualityReport(date.getFullYear(), date.getMonth());
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
    let { t, classes, supplyQualityReport } = this.props;

    if (!existsAndIsNotEmpty(supplyQualityReport.data)) return null;

    return (
      <React.Fragment>
        <Grid item>
          <SupplyQualityReportTransformerComponent supplyName="TR1" />
        </Grid>
        <Grid item>
          <SupplyQualityReportTransformerComponent supplyName="TR2" />
        </Grid>
        <Grid item>
          <SupplyQualityReportTHDComponent supplyName="TR1" />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName="TR1"
            phaseNumber={"L1"}
            infeeds={[
              "1F1",
              "1F2",
              "1F3",
              "1F4",
              "1F5",
              "1F6",
              "1F7",
              "3F1",
              "3F2",
              "1FP1",
              "1FP2"
            ]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName="TR1"
            phaseNumber={"L2"}
            infeeds={[
              "1F1",
              "1F2",
              "1F3",
              "1F4",
              "1F5",
              "1F6",
              "1F7",
              "3F1",
              "3F2",
              "1FP1",
              "1FP2"
            ]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName="TR1"
            phaseNumber={"L3"}
            infeeds={[
              "1F1",
              "1F2",
              "1F3",
              "1F4",
              "1F5",
              "1F6",
              "1F7",
              "3F1",
              "3F2",
              "1FP1",
              "1FP2"
            ]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportTHDComponent supplyName="TR2" />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName="TR2"
            phaseNumber={"L1"}
            infeeds={["2F1", "2F2", "2F3", "2F4", "2F5", "2F6", "2FP1", "2FP2"]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName="TR2"
            phaseNumber={"L2"}
            infeeds={["2F1", "2F2", "2F3", "2F4", "2F5", "2F6", "2FP1", "2FP2"]}
          />
        </Grid>
        <Grid item>
          <SupplyQualityReportInfeedsTHDComponent
            supplyName="TR2"
            phaseNumber={"L3"}
            infeeds={["2F1", "2F2", "2F3", "2F4", "2F5", "2F6", "2FP1", "2FP2"]}
          />
        </Grid>
      </React.Fragment>
    );
  };

  render() {
    let { t, classes, power15MinReport } = this.props;

    return (
      <React.Fragment>
        <Grid item className={classes.navBarGridItem}>
          {this.renderNavBar()}
        </Grid>
        {this.renderReport()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  let selectedDate = null;

  if (
    exists(state.supplyQualityReport.year) &&
    exists(state.supplyQualityReport.month)
  )
    selectedDate = new Date(
      state.supplyQualityReport.year,
      state.supplyQualityReport.month
    );
  return {
    supplyQualityReport: state.supplyQualityReport,
    selectedDate: selectedDate
  };
}

const mapDispatchToProps = {
  fetchSupplyQualityReport: fetchSupplyQualityReportActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(Power15MinComponent))));
